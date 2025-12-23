import { ConflictRequestError, NotFoundRequestError } from "../errors/api/ApiError";
import { SendFriendRequestDTO } from "../types/friend/Friend";
import userService from "./user.service";
class UserService {

  sendAddFriendRequest = async (payload: SendFriendRequestDTO & {senderId: string}) => {
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
    
    // check cả 2 đã là bạn của nhau
    
  }

}
export default new UserService();
