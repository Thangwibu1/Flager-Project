import { GroupChatModel } from '../../models/groupChat/group-chat.model.mongo';
import { GroupChat } from '../../types/group/GroupChat';

class GroupChatRepository {
    findById = async (id: string, select: (keyof GroupChat)[] = []) => {
        const foundGroupChat = await GroupChatModel.findOne({
            _id: id,
        })
            .select(select)
            .lean();
        return foundGroupChat;
    };

    /**
     * @param name
     * @param select
     * @returns
     */
    findAllByName = async (name: string, select: (keyof GroupChat)[] = []) => {
        const foundGroupChats = await GroupChatModel.find({
            name: name,
        })
            .select(select)
            .lean();
        return foundGroupChats;
    };

    findByAdmin = async (adminId: string, select: (keyof GroupChat)[] = []) => {
        const foundGroupChats = await GroupChatModel.find({
            admin: adminId,
            type: 'groupChat',
        })
            .select(select)
            .lean();
        return foundGroupChats;
    };

    findByType = async (
        type: 'groupChat' | 'privateChat',
        select: (keyof GroupChat)[] = []
    ) => {
        const foundGroupChats = await GroupChatModel.find({
            type: type,
        })
            .select(select)
            .lean();
        return foundGroupChats;
    };

    createOne = async (data: any) => {
        return GroupChatModel.create(data);
    };

    updateById = async (id: string, data: Partial<GroupChat>) => {
        return GroupChatModel.findByIdAndUpdate(id, data, { new: true }).lean();
    };

    /**
     * @param id
     * @returns deleted groupChat
     */
    deleteById = async (id: string) => {
        return GroupChatModel.findByIdAndUpdate(
            id,
            { deletedAt: new Date() },
            { new: true }
        ).lean();
    };
}

export default new GroupChatRepository();
