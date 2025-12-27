import { NotFoundRequestError } from "../errors/api/ApiError";
import userRepository from "../repositories/user/user.repository";
import userNodeRepository from '../repositories/user/user.repository.graph';
import { FullUser, RegisterUserDTO } from "../types/user/User";
import * as userConvertor from '../converters/user.converter';
class UserService {
    getUserById = async (id: string, select: (keyof FullUser)[] = ["_id", "email", "phone", "username"]) => {
        const user = await userRepository.findById(id, select);
        return user;
    }
    getUserByEmail = async (email: string, select: (keyof FullUser)[] = ["_id", "email", "phone", "username"]) => {
        const user = await userRepository.findByEmail(email, select);
        return user;
    };
    createRegularUser = async (payload: RegisterUserDTO) => {
        const user = await userRepository.createOne(payload);
        await userNodeRepository.createNode({
            id: user._id.toString(),
            username: user.username
        });
    }
    getUserDetail = async (currentUserId: string, userId: string) => {
        // check userId exist
        const foundUser = await this.getUserById(userId, ["email", "phone", "username"]);
        if(!foundUser){
            throw new NotFoundRequestError("Not found user");
        }
        // if(userId != currentUserId){
            // nếu sau này có phân biệt ai có thể xem thì bắt thêm
        // }
        return userConvertor.toUserProfile(foundUser as any);
    }
}
export default new UserService();
