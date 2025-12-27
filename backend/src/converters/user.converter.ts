import { IUserDocument } from "../models/user/user.model.mongo";
import { UserProfileResponse } from "../types/user/user.response";

export const toUserProfile = (user: IUserDocument): UserProfileResponse => {
  return {
    email: user.email,
    username: user.username,
    phone: user.phone
  }
}