import groupChatRepository from '../repositories/groupChat/group-chat.repository';
import groupChatRepositoryGraph from '../repositories/groupChat/group-chat.repository.graph';
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
        },
        friendId?: string
    ) => {
        // Nếu là groupChat thì cần có admin, nếu là privateChat thì không cần
        const groupChatData =
            data.type === 'groupChat' ? { ...data, admin: creatorId } : data;

        const groupChat = await groupChatRepository.createOne(groupChatData);

        const groupChatRealtionData = { id: groupChat._id.toString(), ...data };

        // TODO: Tạo quan hệ trong Neo4j giữa user và groupChat
        const groupChatRelation =
            await groupChatRepositoryGraph.createNodeWithAdmin(
                creatorId,
                groupChatRealtionData
            );

        //nếu là private chat thì add luôn người kia vào
        if (data.type === 'privateChat' && friendId) {
            try {
                await groupChatRepositoryGraph.addMember(
                    friendId,
                    groupChat._id.toString()
                );
            } catch (error) {
                throw new Error("Can't add friend to private chat");
            }
        }
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
