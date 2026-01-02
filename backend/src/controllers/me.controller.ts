import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { ApiResponse } from '../utils/api-response.util';
import { UpdateUserProfileDTO } from '../types/user/user.request';

class MeController {

    updateMyProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const currentUserId = req.user!.id;
            const body: UpdateUserProfileDTO = req.body;
            await userService.updateMyProfile(currentUserId, body);
            return res.json(
                ApiResponse.success('Update success', null)
            );
        } catch (error) {
            next(error);
        }
    }
    getMyProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
      try {
         const currentUserId = req.user!.id;
            const myProfile = await userService.getMyProfile(currentUserId);
            const dataFinal = {
              myProfile: myProfile
            };
            return res.json(
                ApiResponse.success('Update success', dataFinal)
            );
      } catch (error) {
        next(error);
      }
    }
}
export default new MeController();