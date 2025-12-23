import userRepository from "../repositories/user.repository";
import userGraphRepository from '../repositories/user.repo.graph';
import { FullUser, RegisterUserDTO } from "../types/user/User";

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
        await userGraphRepository.createNode({
            id: user._id.toString(),
            username: user.username
        });
    }
}
export default new UserService();
