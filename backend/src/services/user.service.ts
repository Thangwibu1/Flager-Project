import { NotFoundRequestError } from '../errors/api/ApiError';
import userRepository from '../repositories/user/user.repository';
import userNodeRepository from '../repositories/user/user.repository.graph';
import {
    FullUser,
    RegisterUserDTO,
    UpdateUserProfileDTO,
} from '../types/user/user.request';
import * as userConvertor from '../converters/user.converter';
class UserService {
    getUserById = async (
        id: string,
        select: (keyof FullUser)[] = ['_id', 'email', 'phone', 'username']
    ) => {
        const user = await userRepository.findById(id, select);
        return user;
    };
    getUserByEmail = async (
        email: string,
        select: (keyof FullUser)[] = ['_id', 'email', 'phone', 'username']
    ) => {
        const user = await userRepository.findByEmail(email, select);
        return user;
    };
    createRegularUser = async (payload: RegisterUserDTO) => {
        const user = await userRepository.createOne(payload);
        await userNodeRepository.createNode({
            id: user._id.toString(),
            username: user.username,
        });
    };
    /**
     * Logic nghiệp vụ xử lí việc lấy profile của user
     * @param currentUserId
     * @param userId
     * @returns
     */
    getUserProfile = async (currentUserId: string, userId: string) => {
        // check userId exist
        const foundUser = await this.getUserById(userId);
        if (!foundUser) {
            throw new NotFoundRequestError('Not found user');
        }

        // nếu sau này có phân biệt ai có thể xem thì bắt thêm
        // if(userId != currentUserId){}

        return userConvertor.toUserProfile(foundUser as any);
    };
    getMyProfile = async (currentUserId: string) => {
        const user = await this.getUserById(currentUserId);
        return userConvertor.toMyProfile(user as any);
    };
    updateUserProfile = async (
        userId: string,
        payload: UpdateUserProfileDTO
    ) => {
        // update ở mongo
        await userRepository.updateByUserId(userId, payload);
        // update ở userNode
        await userNodeRepository.updateNodeById(userId, payload);
    };
}
export default new UserService();
