import { GroupChatNotFoundError } from '../errors/group/GroupError';
import { UserNotFoundError } from '../errors/user/UserError';
import groupChatRepository from '../repositories/groupChat/group-chat.repository';
import groupChatRepositoryGraph from '../repositories/groupChat/group-chat.repository.graph';
import userRepository from '../repositories/user/user.repository';
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
        const creator = await userRepository.findById(creatorId);
        if (!creator) {
            throw new UserNotFoundError();
        }

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
                throw new UserNotFoundError("Can't add friend to private chat");
            }
        }
        return groupChat;
    };

    addMember = async (
        userId: string,
        groupChatId: string,
        adderId?: string
    ) => {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new UserNotFoundError();
        }
        const groupChatFound = await groupChatRepository.findById(groupChatId);
        if (!groupChatFound) {
            throw new GroupChatNotFoundError();
        }
        const groupChat = await groupChatRepositoryGraph.addMember(
            userId,
            groupChatId,
            adderId
        );
        return groupChat ? true : false;
    };

    updateName = async (id: string, name: string) => {
        const groupChatFound = await groupChatRepository.findById(id);
        if (!groupChatFound) {
            throw new GroupChatNotFoundError();
        }
        const updatedGroupChat = await groupChatRepository.updateById(id, {
            name,
        });
        return updatedGroupChat;
    };

    delete = async (id: string) => {
        const groupChatFound = await groupChatRepository.findById(id);
        if (!groupChatFound) {
            throw new GroupChatNotFoundError();
        }
        const deletedGroupChat = await groupChatRepository.deleteById(id);
        return deletedGroupChat;
    };
}

export default new GroupChatService();
