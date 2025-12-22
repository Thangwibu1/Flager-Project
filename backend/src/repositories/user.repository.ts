import { IUserDocument, User } from '../models/user/User.model.mongo';

class UserRepository {
    findByEmail = async (email: string, select: (keyof IUserDocument)[] = []) => {
        const foundUser = await User.findOne({
            email: email,
        })
            .select(select)
            .lean();
        return foundUser;
    };
}
export default new UserRepository();