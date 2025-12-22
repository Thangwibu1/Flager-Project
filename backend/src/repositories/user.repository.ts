import { IUserDocument, User } from '../models/user/User.model.mongo';
import { FullUser } from '../types/user/User';

class UserRepository {
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