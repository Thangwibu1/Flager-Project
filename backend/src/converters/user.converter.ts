import { IUserDocument } from "../models/user/user.model.mongo";
import { UserProfileResponse } from "../types/user/user.response";

export const toUserProfile = (user: IUserDocument): UserProfileResponse => {
  return {
    id: user._id.toString(),
    username: user.username,
  }
}
export const toMyProfile = (user: IUserDocument) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone,
  }
}