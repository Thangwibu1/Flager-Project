import { LoginUserDTO, RegisterUserDTO } from '../types/user/User';
import userService from './user.service';
import { ConflictRequestError, UnauthorizedRequestError } from '../errors/api/ApiError';
import { comparePassword, hashPassword } from '../utils/bcrypt.util';
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
    // tạm thời tạo để có thể test tạm phần create user, nếu tương lai cần kiểm tra otp trong mail thì sẽ sửa lại sau
    register = async (payload: RegisterUserDTO) => {
        // check email exist
        const foundUser = await userService.getUserByEmail(payload.email, ['_id']);
        if(foundUser){
            throw new ConflictRequestError('Another user has already registered by this email!');
        }
        // hash password 
        payload.password = await hashPassword(payload.password);
        // create user
        await userService.createRegularUser(payload);
    }
}
export default new AuthService();
