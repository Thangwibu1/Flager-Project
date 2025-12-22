import { LoginUserDTO } from '../types/user/User';
import userRepository from '../repositories/user.repository';
import { UnauthorizedRequestError } from '../errors/api/ApiError';
import { comparePassword } from '../utils/bcrypt.util';
import * as jwtUtil from '../utils/jwt.util';
class AuthService {
    login = async (user: LoginUserDTO) => {
        // check email exist
        const existUser = await userRepository.findByEmail(user.email, ['_id', 'email', 'username', 'password']);
        if (!existUser) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        // check password
        const isEqual = await comparePassword(
            user.password,
            existUser.password
        );
        if (!isEqual) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        // generate accessToken and RefreshToken
        const userId = existUser._id.toString();
        const accessToken = jwtUtil.generateAccessToken(userId);
        const refreshToken = jwtUtil.generateRefreshToken(userId);
        const userResponse = {
            email: existUser.email,
            username: existUser.username,
        };
        const dataFinal = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: userResponse,
        };
        return dataFinal;
    };
}
export default new AuthService();
