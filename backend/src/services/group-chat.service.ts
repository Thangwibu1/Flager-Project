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

    create = async (
        creatorId: string,
        data: {
            name: string;
            avatar?: string;
            type: 'groupChat' | 'privateChat';
        }
    ) => {
        // Nếu là groupChat thì cần có admin, nếu là privateChat thì không cần
        const groupChatData =
            data.type === 'groupChat' ? { ...data, admin: creatorId } : data;

        const groupChat = await groupChatRepository.createOne(groupChatData);

        // TODO: Tạo quan hệ trong Neo4j giữa user và groupChat
        // const groupChatRelation = await groupChatRepository.createRelationAdmin(creatorId, groupChat._id);

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
