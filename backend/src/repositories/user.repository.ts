import { IUserDocument, User } from '../models/user/User.model.mongo';
import { FullUser } from '../types/user/User';

class UserRepository {
    findById = async (id: string, select: (keyof FullUser)[] = []) => {
        const foundUser = await User.findOne({
            _id: id,
        })
            .select(select)
            .lean();
        return foundUser;
    }
    findByEmail = async (email: string, select: (keyof FullUser)[] = []) => {
        const foundUser = await User.findOne({
            email: email,
        })
            .select(select)
            .lean();
        return foundUser;
    };

    createOne = async (data: any) => {
        return User.create(data);
    }
}
export default new UserRepository();