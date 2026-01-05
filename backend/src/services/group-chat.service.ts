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

    /**
     * Get all group chats for a user using Neo4j graph repository
     */
    getGroupChatsByUserId = async (userId: string) => {
        // Get group chat nodes from Neo4j
        const groupChatNodes = await groupChatRepositoryGraph.findByUserId(
            userId
        );

        if (!groupChatNodes || groupChatNodes.length === 0) {
            return [];
        }

        // Get full group chat details from MongoDB
        const groupChatIds = groupChatNodes.map(node => node.id);
        const groupChats = await Promise.all(
            groupChatIds.map(id => groupChatRepository.findById(id))
        );

        // Filter out null values
        return groupChats.filter(gc => gc !== null);
    };

    /**
     * Get single group chat by ID
     */
    getGroupChatById = async (groupChatId: string) => {
        const groupChat = await groupChatRepository.findById(groupChatId);

        if (!groupChat) {
            throw new GroupChatNotFoundError();
        }

        return groupChat;
    };
}

export default new GroupChatService();
