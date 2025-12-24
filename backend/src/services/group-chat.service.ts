import groupChatRepository from '../repositories/groupChat/group-chat.repository';
import { GroupChat } from '../types/group/GroupChat';

class GroupChatService {
    getById = async (
        id: string,
        select: (keyof GroupChat)[] = [
            '_id',
            'name',
            'avatar',
            'type',
            'lastMessageAt',
        ]
    ) => {
        const groupChat = await groupChatRepository.findById(id, select);
        return groupChat;
    };

    create = async (data: {
        name: string;
        avatar?: string;
        type: 'groupChat' | 'privateChat';
    }) => {
        const groupChat = await groupChatRepository.createOne(data);
        return groupChat;
    };

    updateName = async (id: string, name: string) => {
        const updatedGroupChat = await groupChatRepository.updateById(id, {
            name,
        });
        return updatedGroupChat;
    };

    delete = async (id: string) => {
        const deletedGroupChat = await groupChatRepository.deleteById(id);
        return deletedGroupChat;
    };
}

export default new GroupChatService();
