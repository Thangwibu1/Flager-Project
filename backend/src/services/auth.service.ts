import { LoginUserDTO, RegisterUserDTO } from '../types/user/User';
import userService from './user.service';
import {
    BadRequestError,
    ConflictRequestError,
    NotFoundRequestError,
    UnauthorizedRequestError,
} from '../errors/api/ApiError';
import { comparePassword, hashPassword } from '../utils/bcrypt.util';
import tokenService from './token.service';
import * as jwtUtil from '../utils/jwt.util';
class AuthService {
    login = async (user: LoginUserDTO, deviceId: string | string[] | undefined) => {
        // check deviceId
        if(!deviceId || typeof deviceId != 'string'){
            throw new BadRequestError("DeviceId is invalid");
        }
        // check email exist
        const foundUser = await userService.getUserByEmail(user.email, [
            '_id',
            'email',
            'password',
            'phone',
            'username',
        ]);
        if (!foundUser) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        const isPasswordEqual = await comparePassword(
            user.password,
            foundUser.password
        );
        if (!isPasswordEqual) {
            throw new UnauthorizedRequestError('Email or password are wrong');
        }
        // generate accessToken and RefreshToken
        const userId = foundUser._id.toString();
        const accessToken = tokenService.getNewAccessToken({ userId });
        const refreshToken = await tokenService.getNewRefreshToken({ userId }, deviceId);
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
        const foundUser = await userService.getUserByEmail(payload.email, [
            '_id',
        ]);
        if (foundUser) {
            throw new ConflictRequestError(
                'Another user has already registered by this email!'
            );
        }
        // hash password
        payload.password = await hashPassword(payload.password);
        // create user
        await userService.createRegularUser(payload);
    };
    /**
     * Hàm giúp xác thực user hợp lệ để vào các route sau
     * @param token 
     * @returns 
     */
    verifyAccessToken = async (token: string): Promise<{userId: string}> => {
        // check in blacklist
        if (await tokenService.isInBlackList(token)) {
            throw new UnauthorizedRequestError('You do not have permission to get resources');
        }
        // decode token
        const payload = jwtUtil.verifyAccessToken(token);
        const userId = payload.userId;
        // check user in payload
        // check userId nonempty và có trong hệ thống không
        if(!userId || !( userService.getUserById(userId, ['_id']))){
            throw new NotFoundRequestError("Not found user");
        }
        return {userId: payload.userId}
    };
    /**
     * Hàm giúp kiểm tra xem user có đủ xác thực được bản thân để vào lấy token mới không
     * @param token 
     * @param deviceId 
     * @returns 
     */
    verifyRefreshToken = async (token: string, deviceId: string): Promise<{userId: string}> => {
        // check token có trong db ko
        const payload = jwtUtil.verifyRefreshToken(token);
        const userId = payload.userId;
        // check userId nonempty và có trong hệ thống không
        if(!userId || !( userService.getUserById(userId, ['_id']))){
            throw new NotFoundRequestError("Not found user");
        }
        const currentDeviceId = await tokenService.getDeviceIdByRefreshTokenAndUserId(userId, token);
        if (!currentDeviceId) {
            throw new UnauthorizedRequestError('You are not allowed to get resources');
        }
        // RefreshToken lúc này được dùng ở 2 device chứng tỏ 2 device cùng dùng cho 1 refreshToken (bị lộ)
        if(deviceId != currentDeviceId){
            // gọi service để xóa refreshToken trong hệ thống để không ai sài refreshToken này refresh lại được 
            await tokenService.deleteRefreshToken(userId, token);
            throw new UnauthorizedRequestError('You are not allowed to get resources');
        }
        return {userId: payload.userId}
    }
    refreshAccessToken = async (userId: string) => {
        return tokenService.getNewAccessToken({userId});
    }
}
export default new AuthService();
