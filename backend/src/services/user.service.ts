import userRepository from "../repositories/user.repository";
import { FullUser } from "../types/user/User";

class UserService {
    getUserByEmail = async (email: string, select: (keyof FullUser)[] = ["_id", "email", "phone", "username"]) => {
        const user = await userRepository.findByEmail(email, select);
        return user;
    };
}
export default new UserService();
