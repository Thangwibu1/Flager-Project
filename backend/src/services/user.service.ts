import userRepository from "../repositories/user.repository";
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
        await userRepository.createOne(payload);
    }
}
export default new UserService();
