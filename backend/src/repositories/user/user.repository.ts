import { User } from '../../models/user/User.model.mongo';
import { FullUser } from '../../types/user/user.request';

class UserRepository {
    findById = async (id: string, select: (keyof FullUser)[] = []) => {
        const foundUser = await User.findOne({
            _id: id,
        })
            .select(select)
            .lean<FullUser>();
        return foundUser;
    };
    findByEmail = async (email: string, select: (keyof FullUser)[] = []) => {
        const foundUser = await User.findOne({
            email: email,
        })
            .select(select)
            .lean<FullUser>();
        return foundUser;
    };

    createOne = async (data: any) => {
        return User.create(data);
    };

    updateByUserId = async (userId: string, data: any) => {
        await User.updateOne(
            {
                _id: userId,
                deletedAt: null,
            },
            data
        );
    };
}
export default new UserRepository();
