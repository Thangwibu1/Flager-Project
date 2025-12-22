import { LoginUserDTO } from '../types/user/User';
import userService from './user.service';
import { UnauthorizedRequestError } from '../errors/api/ApiError';
import { comparePassword } from '../utils/bcrypt.util';
import tokenService from './token.service';
class AuthService {
    login = async (user: LoginUserDTO) => {
        // check email exist
        const foundUser = await userService.getUserByEmail(user.email, ['_id', 'email', 'password', "phone", "username"]);
        if(!foundUser){
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        const isPasswordEqual = await comparePassword(user.password, foundUser.password);
        if (!isPasswordEqual) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        // generate accessToken and RefreshToken
        const userId = foundUser._id.toString();
        const accessToken = tokenService.getNewAccessToken({userId});
        const refreshToken = await tokenService.getNewRefreshToken({userId});
        // create response data
        const userResponse = {
            email: foundUser.email,
            username: foundUser.username,
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
