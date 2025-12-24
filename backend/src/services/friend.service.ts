import { ConflictRequestError, NotFoundRequestError } from "../errors/api/ApiError";
import { FriendAcceptDTO, FriendUnfriendDTO, SendFriendRequestDTO } from "../types/friend/Friend";
import userService from "./user.service";
import friendRequestRelationRepository from "../repositories/user/friend-request-relation.repository.graph";
import isFriendRelationRepository from "../repositories/user/is-friend-relation.repository.graph";
class FriendService {
  /**
   * Hàm giúp kiểm trả sender có gửi lời mới kết bạn với receiver từ trước chưa
   * @param senderId 
   * @param receiverId 
   * @returns 
   */
  isSenderSentRequestFriendToReceiver = async (senderId: string, receiverId: string): Promise<boolean> => {
    const isTrue = await friendRequestRelationRepository.isHaveRelationWith(senderId, receiverId);
    return isTrue;
  }
  /**
   * Hàm này giúp xử lí logic yêu cầu kết bạn (logic nghiệp vụ)
   * @param payload 
   * @returns 
   */
  isSenderAndReceiverIsFriend = async (senderId: string, receiverId: string) => {
    const  isFriend = await isFriendRelationRepository.isHaveRelationWith(senderId, receiverId);
    return isFriend;
  }
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
    const senderHaveRelationWithReceiver = await this.isSenderSentRequestFriendToReceiver(payload.senderId, payload.receiverId);
    const receiverHaveRelationWithSender = await this.isSenderSentRequestFriendToReceiver(payload.receiverId, payload.senderId);
    if(senderHaveRelationWithReceiver || receiverHaveRelationWithSender){
      throw new ConflictRequestError("You or your requested friend has already sent a request before");
    }
    // check cả 2 đã là bạn của nhau
    const isFriend = await this.isSenderAndReceiverIsFriend(payload.senderId, payload.receiverId);
    if(isFriend){
      throw new ConflictRequestError("Receiver and sender are already friend of each other!");
    } 
    // create friend request
    const dataFriendRequest = {
      createdAt: new Date(),
    }
    const newFriendRequest = await friendRequestRelationRepository.create(payload.senderId, payload.receiverId, dataFriendRequest);
    return newFriendRequest;
  }
  /**
   * Xóa lời mời kết bạn phía sender cho receiver trước đó
   * @param senderId 
   * @param receiverId 
   */
  deleteFriendRequest = async (senderId: string, receiverId: string): Promise<void> => {
    await friendRequestRelationRepository.deleteByFromIdAndToId(senderId, receiverId);
  }
  /**
   * Tạo quan hệ bạn bè giữa sender và receiver
   * @param senderId 
   * @param receiverId 
   * @param data 
   */
  createIsFriendRelation = async (senderId: string, receiverId: string, data: {createdAt: Date}) => {
    await isFriendRelationRepository.createTwoEdge(senderId, receiverId, data);
  }
  /**
   * Logic nghiệp vụ kết bạn giữa sender và receiver
   * @param payload 
   */
  acceptFriendRequest = async (payload: FriendAcceptDTO):  Promise<void> => {
    // check 2 id not the same
    if(payload.receiverId == payload.senderId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check senderId and receiverId exist
    const existSender = await userService.getUserById(payload.receiverId);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(payload.senderId);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check receiverId have already sent a request to senderId (người được chấp nhận lời mời kết bạn phải gửi lời mời từ trước rồi)
    const isReceiverSentRequest = this.isSenderSentRequestFriendToReceiver(payload.receiverId, payload.senderId);
    if(!isReceiverSentRequest){
      throw new ConflictRequestError("Receiver has not sent you a friend request!");
    }
    // check sender and receiver isFriend of each other
    const isFriend = await this.isSenderAndReceiverIsFriend(payload.senderId, payload.receiverId);
    if(isFriend){
      throw new ConflictRequestError("Receiver and sender are already friend of each other!");
    }
    // delete FRIEND_REQUEST relation from receiver side
    await this.deleteFriendRequest(payload.receiverId, payload.senderId);
    // create IS_FRIEND relationship
    const dataIsFriendRelation = {
      createdAt: new Date()
    }
    await this.createIsFriendRelation(payload.senderId, payload.receiverId, dataIsFriendRelation);
  }
  /**
   * Xóa quan hệ bạn bè của user and bạn của user
   * @param userId 
   * @param friendId 
   */
  deleteIsFriendRelation = async (userId: string, friendId: string) => {
    // xóa quan hệ phía user
    await isFriendRelationRepository.deleteByFromIdAndToId(userId, friendId);
    // xóa cả quan hệ phía friend
    await isFriendRelationRepository.deleteByFromIdAndToId(friendId, userId);
  }
  /**
   * Xử lí logic nghiệp vụ hủy kết bạn giữa 2 user
   * @param payload 
   */
  unfriendUser = async (payload: FriendUnfriendDTO): Promise<void> => {
    // check 2 id not the same
    if(payload.receiverId == payload.senderId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check senderId and receiverId exist
    const existSender = await userService.getUserById(payload.receiverId);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(payload.senderId);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check 2 user have already been friend
    const isFriend = await this.isSenderAndReceiverIsFriend(payload.senderId, payload.receiverId);
    if(!isFriend){
      throw new ConflictRequestError("You and your friend are not friend of each other");
    }
    // delete friend relation between 2 user
    await this.deleteIsFriendRelation(payload.receiverId, payload.senderId);
  }
}
export default new FriendService();
