import { ConflictRequestError, NotFoundRequestError } from "../errors/api/ApiError";
import { FriendAcceptDTO, FriendUnfriendDTO, FriendRequestDTO } from "../types/friend/Friend";
import userService from "./user.service";
import userNodeRepository from '../repositories/user/user.repository.graph';
class FriendService {
  /**
   * Hàm giúp kiểm trả sender có gửi lời mới kết bạn với receiver từ trước chưa
   * @param senderId 
   * @param receiverId 
   * @returns 
   */
  hasRequestedFriend = async (senderId: string, receiverId: string): Promise<boolean> => {
    return await userNodeRepository.isRequestFriend(senderId, receiverId);
  }
  /**
   * Hàm check user1 và user2 có là bạn của nhau không
   * @param senderId 
   * @param receiverId 
   * @returns 
   */
  areFriends = async (senderId: string, receiverId: string) => {
    return await userNodeRepository.areFriends(senderId, receiverId);
  }
  /**
   * Hàm này giúp xử lí logic yêu cầu kết bạn (logic nghiệp vụ)
   * @param payload 
   * @returns 
   */
  sendAddFriendRequest = async (currentUserId: string, receiverId: string) => {
    // check 2 id không trùng
    if(receiverId == currentUserId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check 2 id có tồn tại
    const existSender = await userService.getUserById(receiverId, ['_id']);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(currentUserId, ['_id']);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check cả 2 đã từng gửi request cho người còn lại
    const senderHaveRelationWithReceiver = await this.hasRequestedFriend(currentUserId, receiverId);
    const receiverHaveRelationWithSender = await this.hasRequestedFriend(receiverId, currentUserId);
    if(senderHaveRelationWithReceiver || receiverHaveRelationWithSender){
      throw new ConflictRequestError("You or your requested friend has already sent a request before");
    }
    // check cả 2 đã là bạn của nhau
    const isFriend = await this.areFriends(currentUserId, receiverId);
    if(isFriend){
      throw new ConflictRequestError("Receiver and sender are already friend of each other!");
    } 
    // create friend request
    const dataFriendRequest = {
      createdAt: new Date(),
    }
    const newFriendRequest = await userNodeRepository.createRequestFriend(currentUserId, receiverId, dataFriendRequest);
    return newFriendRequest;
  }
  /**
   * Xóa lời mời kết bạn phía sender cho receiver trước đó
   * @param senderId 
   * @param receiverId 
   */
  deleteFriendRequest = async (senderId: string, receiverId: string): Promise<void> => {
    await userNodeRepository.deleteRequestFriend(senderId, receiverId);
  }
  /**
   * Tạo quan hệ bạn bè giữa sender và receiver
   * @param senderId 
   * @param receiverId 
   * @param data 
   */
  createIsFriendRelation = async (senderId: string, receiverId: string, data: {createdAt: Date}) => {
    await userNodeRepository.createIsFriendTwoEdges(senderId, receiverId, data);
  }
  /**
   * Logic nghiệp vụ kết bạn giữa sender và receiver
   * @param payload 
   */
  acceptFriendRequest = async (currentUserId: string, receiverId: string):  Promise<void> => {
    // check 2 id not the same
    if(receiverId == currentUserId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check senderId and receiverId exist
    const existSender = await userService.getUserById(receiverId, ['_id']);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(currentUserId, ['_id']);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check receiverId have already sent a request to senderId (người được chấp nhận lời mời kết bạn phải gửi lời mời từ trước rồi)
    const isReceiverSentRequest = await this.hasRequestedFriend(receiverId, currentUserId);
    if(!isReceiverSentRequest){
      throw new ConflictRequestError("Receiver has not sent you a friend request!");
    }
    // check sender and receiver isFriend of each other
    const isFriend = await this.areFriends(currentUserId, receiverId);
    if(isFriend){
      throw new ConflictRequestError("Receiver and sender are already friend of each other!");
    }
    // delete FRIEND_REQUEST relation from receiver side
    await this.deleteFriendRequest(receiverId, currentUserId);
    // create IS_FRIEND relationship
    const dataIsFriendRelation = {
      createdAt: new Date()
    }
    await this.createIsFriendRelation(currentUserId, receiverId, dataIsFriendRelation);
  }
  /**
   * Xóa quan hệ bạn bè của user và bạn của user
   * @param userId 
   * @param friendId 
   */
  deleteIsFriendRelation = async (userId: string, friendId: string) => {
    // xóa quan hệ bạn bè của cả 2 bên
    await userNodeRepository.deleteIsFriendTwoEdges(userId, friendId);
  }
  /**
   * Xử lí logic nghiệp vụ hủy kết bạn giữa 2 user
   * @param payload 
   */
  unfriendUser = async (currentUserId: string, receiverId: string): Promise<void> => {
    // check 2 id not the same
    if(receiverId == currentUserId){
      throw new ConflictRequestError("You can not add friend with yourself");
    }
    // check senderId and receiverId exist
    const existSender = await userService.getUserById(receiverId, ['_id']);
    if(!existSender){
      throw new NotFoundRequestError("Not found sender");
    }
    const existReceiver = await userService.getUserById(currentUserId, ['_id']);
    if(!existReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check 2 user have already been friend
    const isFriend = await this.areFriends(currentUserId, receiverId);
    if(!isFriend){
      throw new ConflictRequestError("You and your friend are not friend of each other");
    }
    // delete friend relation between 2 user
    await this.deleteIsFriendRelation(receiverId, currentUserId);
  }
  /**
   * Xử lí logic nghiệp vụ (đếm số lượng bạn bè) của 1 user
   * @param payload 
   * @returns 
   */
  countFriendsOfUser = async (currentUserId: string, userTargetId: string): Promise<number> => {
    // check userId 
    const foundUser = await userService.getUserById(userTargetId);
    if(!foundUser){
      throw new NotFoundRequestError("Not found user");
    }
    // nếu sau này có cần check user hiện tại có được xem không thì code thêm
    // if(currentUserId != userTargetId){}
    
    const totalFriend = await userNodeRepository.countUserIsFriendOf(userTargetId);
    return totalFriend;
  }
  /**
   * Xử lí logic nghiệp vụ từ chối lời mời kết bạn
   * @param currentUserId 
   * @param receiverId 
   */
  rejectFriendRequest = async (currentUserId: string, receiverId: string) => {
    // check receiver tồn tại
    const foundReceiver = await userService.getUserById(currentUserId, ['_id']);
    if(!foundReceiver){
      throw new NotFoundRequestError("Not found receiver");
    }
    // check receiver có gửi lời mờn đến viewer
    if(!(await userNodeRepository.isRequestFriend(receiverId, currentUserId))){
      throw new ConflictRequestError("Receiver has not send friend request to you");
    }
    await this.deleteFriendRequest(receiverId, currentUserId);
  }
}
export default new FriendService();
