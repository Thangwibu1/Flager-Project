import { ConflictRequestError, NotFoundRequestError } from "../errors/api/ApiError";
import { FriendAcceptDTO, SendFriendRequestDTO } from "../types/friend/Friend";
import userService from "./user.service";
import friendRequestRelationRepo from "../repositories/friend-request-relation.repo.graph";
class UserService {
  /**
   * Hàm giúp kiểm trả sender có gửi lời mới kết bạn với receiver từ trước chưa
   * @param senderId 
   * @param receiverId 
   * @returns 
   */
  isSenderHaveRelationshipWithReceiver = async (senderId: string, receiverId: string): Promise<boolean> => {
    const isTrue = await friendRequestRelationRepo.isHaveRelationWith(senderId, receiverId);
    return isTrue;
  }
  /**
   * Hàm này giúp xử lí logic yêu cầu kết bạn (logic nghiệp vụ)
   * @param payload 
   * @returns 
   */
  sendAddFriendRequest = async (payload: SendFriendRequestDTO) => {
    // check 2 id không trùng
    if(payload.receiverId == payload.senderId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check 2 id có tồn tại
    const existSender = await userService.getUserById(payload.receiverId);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(payload.senderId);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check cả 2 đã từng gửi request cho người còn lại
    const senderHaveRelationWithReceiver = await this.isSenderHaveRelationshipWithReceiver(payload.senderId, payload.receiverId);
    const receiverHaveRelationWithSender = await this.isSenderHaveRelationshipWithReceiver(payload.receiverId, payload.senderId);
    if(senderHaveRelationWithReceiver || receiverHaveRelationWithSender){
      throw new ConflictRequestError("You or your requested friend has already sent a request before");
    }
    // check cả 2 đã là bạn của nhau
    
    // create friend request
    const dataFriendRequest = {
      createdAt: new Date(),
    }
    const newFriendRequest = await friendRequestRelationRepo.create(payload.senderId, payload.receiverId, dataFriendRequest);
    return newFriendRequest;
  }
  acceptFriendRequest = async (payload: FriendAcceptDTO) => {
    
  }
}
export default new UserService();
