import { useEffect } from 'react';
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { useSocket } from '../../../contexts/SocketContext';
import { useAuthStore } from '../../auth/store/auth.store';
import messageService from '../services/message.service';
import { Message } from '../types/message.types';

/**
 * useGroupChatMessages Hook with React Query
 *
 * Features:
 * - ✅ Auto caching với React Query
 * - ✅ Infinite scroll pagination
 * - ✅ Optimistic updates
 * - ✅ Socket.IO real-time updates
 * - ✅ Background refetch
 *
 * @param groupChatId - Group Chat ID (optional)
 * @returns { messages, isLoading, error, sendMessage, fetchNextPage, hasNextPage, isFetchingNextPage }
 *
 * @example
 * const { messages, isLoading, sendMessage, fetchNextPage, hasNextPage } = useGroupChatMessages('groupChatId123');
 *
 * return (
 *   <div>
 *     {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
 *     {messages.map(msg => <MessageBubble key={msg._id} message={msg} />)}
 *     <MessageInput onSend={sendMessage} />
 *   </div>
 * );
 */
export const useGroupChatMessages = (groupChatId?: string) => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();

    // ===== Fetch messages with infinite scroll =====
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        // Query key: Unique identifier cho cache
        queryKey: ['messages', groupChatId],

        // Query function: Fetch data từ API
        queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
            if (!groupChatId) throw new Error('groupChatId is required');

            const response = await messageService.getMessagesByGroupChatId(
                groupChatId,
                {
                    limit: 20,
                    before: pageParam, // undefined cho page đầu, messageId cho pages sau
                }
            );

            return response;
        },

        // Get next page param: Xác định param cho page tiếp theo
        getNextPageParam: lastPage => {
            // Nếu hasMore = true và có messages
            if (lastPage.data.hasMore && lastPage.data.messages.length > 0) {
                // Return ID của message CŨ NHẤT (cuối array)
                const messages = lastPage.data.messages;
                return messages[messages.length - 1]._id;
            }
            // Không còn pages nữa
            return undefined;
        },

        // Initial page param (REQUIRED in React Query v5)
        initialPageParam: undefined as string | undefined,

        // Chỉ fetch khi có groupChatId
        enabled: !!groupChatId,

        // Stale time: Data fresh trong 5 phút
        staleTime: 1000 * 60 * 5,

        // Refetch khi window focus
        refetchOnWindowFocus: true,
    });

    // ===== Join/Leave Socket.IO room =====
    useEffect(() => {
        if (groupChatId && isConnected) {
            console.log(`📨 Joining group chat: ${groupChatId}`);

            // Join room
            socket.joinGroupChat(groupChatId, response => {
                console.log('✅ Joined room:', response);
            });

            // Cleanup: Leave room khi unmount hoặc groupChatId thay đổi
            return () => {
                console.log(`👋 Leaving group chat: ${groupChatId}`);
                socket.leaveGroupChat(groupChatId);
            };
        }
    }, [groupChatId, isConnected, socket]);

    // ===== Socket.IO real-time updates =====
    useEffect(() => {
        if (!isConnected || !groupChatId) return;

        // Handler: New message
        const handleNewMessage = (message: Message) => {
            if (message.groupChatId === groupChatId) {
                console.log('📨 New message received:', message);

                // Update React Query cache
                queryClient.setQueryData(
                    ['messages', groupChatId],
                    (old: any) => {
                        if (!old) return old;

                        return {
                            pages: old.pages.map((page: any, i: number) =>
                                // Add to LAST page (newest messages)
                                i === old.pages.length - 1
                                    ? {
                                          ...page,
                                          data: {
                                              ...page.data,
                                              messages: [
                                                  ...page.data.messages,
                                                  message,
                                              ],
                                          },
                                      }
                                    : page
                            ),
                            pageParams: old.pageParams,
                        };
                    }
                );
            }
        };

        // Handler: Message updated
        const handleMessageUpdated = (message: Message) => {
            if (message.groupChatId === groupChatId) {
                console.log('✏️ Message updated:', message);

                queryClient.setQueryData(
                    ['messages', groupChatId],
                    (old: any) => {
                        if (!old) return old;

                        return {
                            pages: old.pages.map((page: any) => ({
                                ...page,
                                data: {
                                    ...page.data,
                                    messages: page.data.messages.map(
                                        (msg: Message) =>
                                            msg._id === message._id
                                                ? message
                                                : msg
                                    ),
                                },
                            })),
                            pageParams: old.pageParams,
                        };
                    }
                );
            }
        };

        // Handler: Message deleted
        const handleMessageDeleted = (data: { messageId: string }) => {
            console.log('🗑️ Message deleted:', data.messageId);

            queryClient.setQueryData(['messages', groupChatId], (old: any) => {
                if (!old) return old;

                return {
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: {
                            ...page.data,
                            messages: page.data.messages.filter(
                                (msg: Message) => msg._id !== data.messageId
                            ),
                        },
                    })),
                    pageParams: old.pageParams,
                };
            });
        };

        // Register listeners
        socket.onNewMessage(handleNewMessage);
        socket.onMessageUpdated(handleMessageUpdated);
        socket.onMessageDeleted(handleMessageDeleted);

        // Cleanup listeners
        return () => {
            socket.offNewMessage();
            socket.offMessageUpdated();
            socket.offMessageDeleted();
        };
    }, [isConnected, groupChatId, socket, queryClient]);

    // ===== Send message mutation with optimistic update =====
    const sendMessageMutation = useMutation({
        // Mutation function: Send message via Socket.IO
        mutationFn: (content: string) => {
            return new Promise<Message>((resolve, reject) => {
                if (!groupChatId) {
                    reject(new Error('groupChatId is required'));
                    return;
                }

                socket.createMessage(
                    {
                        groupChatId,
                        content,
                        type: 'text',
                    },
                    response => {
                        if (response.success) {
                            resolve(response.message);
                        } else {
                            reject(
                                new Error(
                                    response.error || 'Failed to send message'
                                )
                            );
                        }
                    }
                );
            });
        },

        // onMutate: Chạy TRƯỚC khi send (optimistic update)
        onMutate: async (content: string) => {
            // Cancel ongoing queries để tránh conflict
            await queryClient.cancelQueries({
                queryKey: ['messages', groupChatId],
            });

            // Snapshot previous data để rollback nếu fail
            const previousData = queryClient.getQueryData([
                'messages',
                groupChatId,
            ]);

            // Get current user ID from auth store
            const currentUserId =
                useAuthStore.getState().user?._id || 'unknown';

            // Create temp message
            const tempMessage: Message = {
                _id: `temp-${Date.now()}`,
                groupChatId: groupChatId!,
                senderId: currentUserId,
                content,
                type: 'text',
                readBy: [],
                reactions: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'sending', // Optimistic status
            };

            // Optimistically update cache
            queryClient.setQueryData(['messages', groupChatId], (old: any) => {
                if (!old) return old;

                return {
                    pages: old.pages.map((page: any, i: number) =>
                        i === old.pages.length - 1
                            ? {
                                  ...page,
                                  data: {
                                      ...page.data,
                                      messages: [
                                          ...page.data.messages,
                                          tempMessage,
                                      ],
                                  },
                              }
                            : page
                    ),
                    pageParams: old.pageParams,
                };
            });

            // Return context for rollback
            return { previousData, tempMessage };
        },

        // onError: Chạy nếu send FAIL
        onError: (err, content, context) => {
            console.error('❌ Failed to send message:', err);

            // Rollback to previous state
            if (context?.previousData) {
                queryClient.setQueryData(
                    ['messages', groupChatId],
                    context.previousData
                );
            }
        },

        // onSuccess: Chạy nếu send SUCCESS
        onSuccess: (realMessage, content, context) => {
            console.log('✅ Message sent successfully:', realMessage);

            // Replace temp message with real message from server
            queryClient.setQueryData(['messages', groupChatId], (old: any) => {
                if (!old) return old;

                return {
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: {
                            ...page.data,
                            messages: page.data.messages.map((msg: Message) =>
                                msg._id === context?.tempMessage._id
                                    ? realMessage
                                    : msg
                            ),
                        },
                    })),
                    pageParams: old.pageParams,
                };
            });
        },
    });

    // ===== Flatten pages to single array =====
    const messages = data?.pages.flatMap(page => page.data.messages) ?? [];

    return {
        messages,
        isLoading,
        error,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
