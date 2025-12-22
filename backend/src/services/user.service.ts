import { UnauthorizedRequestError } from "../errors/api/ApiError";
import userRepository from "../repositories/user.repository";

class UserService {
    getUserByEmail = async (email: string) => {
        const existUser = await userRepository.findByEmail(email, ['_id', 'email', 'username', 'password']);
        if (!existUser) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        return existUser;
    };
}
export default new UserService();
