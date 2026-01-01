# 📨 Message Flow Complete Guideline

> **Tài liệu chi tiết về flow một tin nhắn đi từ Frontend → Backend → Frontend**
>
> Bao gồm: Components, Hooks, Services, Socket Events, và toàn bộ data flow

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Complete Flow Diagram](#complete-flow-diagram)
3. [Frontend: Sending Message](#frontend-sending-message)
4. [Backend: Processing Message](#backend-processing-message)
5. [Frontend: Receiving Message](#frontend-receiving-message)
6. [Code References](#code-references)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### Tech Stack

-   **Frontend:** React + TypeScript + Socket.IO Client + React Query
-   **Backend:** Node.js + Express + Socket.IO Server + MongoDB
-   **Real-time:** Socket.IO for bidirectional communication

### Key Concepts

-   **Optimistic Updates:** UI updates immediately before server confirmation
-   **React Query:** Cache management and data synchronization
-   **Socket.IO:** Real-time bidirectional event-based communication

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER ACTION                             │
│                    User types and sends message                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: MessageInput Component                                  │
│ File: frontend/src/features/message/components/MessageInput/    │
│       MessageInput.tsx                                          │
│                                                                 │
│ Function: handleSendMessage()                                   │
│ - Validates input (not empty, not just whitespace)             │
│ - Calls: sendMessage.mutate({ content, groupChatId })          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: useGroupChatMessages Hook                               │
│ File: frontend/src/features/message/hooks/                     │
│       useGroupChatMessages.ts                                   │
│                                                                 │
│ Hook: sendMessage = useMutation(...)                           │
│ Special Features:                                               │
│ - Optimistic Update: Adds message to UI immediately            │
│ - Socket.IO Emit: Sends message to server                      │
│ - Error Handling: Rollback on failure                          │
│                                                                 │
│ Key Functions:                                                  │
│ 1. onMutate: Optimistic update                                 │
│    - Creates temporary message with tempId                     │
│    - Updates React Query cache                                 │
│    - Returns context for rollback                              │
│                                                                 │
│ 2. mutationFn: Socket emit                                     │
│    - socket.emit('createMessage', data, callback)              │
│    - Returns Promise that resolves on server response          │
│                                                                 │
│ 3. onSuccess: Update with real message                         │
│    - Replaces temp message with server message                 │
│    - Updates cache with real _id                               │
│                                                                 │
│ 4. onError: Rollback                                           │
│    - Removes optimistic message                                │
│    - Restores previous state                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: Socket.IO Client Emit                                   │
│ File: frontend/src/contexts/SocketContext.tsx                  │
│                                                                 │
│ Event: 'createMessage'                                         │
│ Data: {                                                         │
│   groupChatId: string,                                         │
│   content: string,                                             │
│   type: 'text',                                                │
│   metadata: {}                                                 │
│ }                                                              │
│ Callback: (response) => resolve(response)                      │
│                                                                 │
│ Transport: WebSocket (Socket.IO protocol)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: Backend Socket.IO Server Receives                       │
│ File: backend/src/socket/index.ts                              │
│                                                                 │
│ Handler Registration:                                           │
│ socket.on('createMessage', (data, callback) =>                 │
│   messageHandlers.createMessage(socket, data, callback)        │
│ )                                                              │
│                                                                 │
│ Flow:                                                           │
│ 1. Socket.IO receives event                                    │
│ 2. Finds registered handler                                    │
│ 3. Binds socket instance to handler                            │
│ 4. Calls handler with (socket, data, callback)                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: Validation Middleware                                   │
│ File: backend/src/socket/middlewares/validate.middleware.ts    │
│                                                                 │
│ Function: withValidation(schema, handler)                      │
│                                                                 │
│ Process:                                                        │
│ 1. Receives: (socket, data, callback)                          │
│ 2. Validates data against Zod schema                           │
│ 3. If valid: calls handler(socket, validatedData, callback)    │
│ 4. If invalid: returns error via callback                      │
│                                                                 │
│ Schema: CreateMessageSocketSchema                              │
│ - groupChatId: string (required)                               │
│ - content: string (required, min 1 char)                       │
│ - type: 'text' | 'image' | 'file' (required)                  │
│ - replyBy: string (optional)                                   │
│ - metadata: object (optional)                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: Message Handler                                         │
│ File: backend/src/socket/handlers/message.handler.ts           │
│                                                                 │
│ Function: handleCreateMessage(socket, data, callback)          │
│                                                                 │
│ Process:                                                        │
│ 1. Extract userId from socket.data.user                        │
│    - Set by auth middleware during connection                  │
│                                                                 │
│ 2. Call messageService.createMessage({                         │
│      groupChatId: ObjectId(data.groupChatId),                  │
│      senderId: ObjectId(userId),                               │
│      content: data.content,                                    │
│      type: data.type,                                          │
│      replyBy: data.replyBy ? ObjectId(data.replyBy) : undefined│
│      metadata: data.metadata                                   │
│    })                                                          │
│                                                                 │
│ 3. Broadcast to room:                                          │
│    socket.to(groupChatId).emit('newMessage', newMessage)       │
│    - Sends to all users in room EXCEPT sender                  │
│                                                                 │
│ 4. Acknowledge to sender:                                      │
│    callback({ success: true, message: newMessage })            │
│    - Confirms message creation                                 │
│    - Returns message with real _id from database               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 7: Message Service                                         │
│ File: backend/src/services/message.service.ts                  │
│                                                                 │
│ Function: createMessage(data)                                  │
│                                                                 │
│ Process:                                                        │
│ 1. Create Message document in MongoDB:                         │
│    const message = await Message.create({                      │
│      groupChatId,                                              │
│      senderId,                                                 │
│      content,                                                  │
│      type,                                                     │
│      replyBy,                                                  │
│      metadata,                                                 │
│      reactions: [],                                            │
│      readBy: [{ userId: senderId, readAt: new Date() }],      │
│      createdAt: new Date(),                                    │
│      updatedAt: new Date()                                     │
│    })                                                          │
│                                                                 │
│ 2. Populate sender info:                                       │
│    await message.populate('senderId', 'username email avatar') │
│                                                                 │
│ 3. Update GroupChat lastMessageAt:                             │
│    await GroupChat.updateOne(                                  │
│      { _id: groupChatId },                                     │
│      { lastMessageAt: new Date() }                             │
│    )                                                           │
│                                                                 │
│ 4. Return populated message                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 8: Database Operation                                      │
│ Database: MongoDB                                               │
│ Collection: messages                                            │
│                                                                 │
│ Document Structure:                                             │
│ {                                                              │
│   _id: ObjectId("..."),                                        │
│   groupChatId: ObjectId("..."),                                │
│   senderId: ObjectId("..."),                                   │
│   content: "Hello, world!",                                    │
│   type: "text",                                                │
│   replyBy: null,                                               │
│   metadata: {},                                                │
│   reactions: [],                                               │
│   readBy: [{ userId: ObjectId("..."), readAt: ISODate(...) }],│
│   deletedAt: null,                                             │
│   createdAt: ISODate("..."),                                   │
│   updatedAt: ISODate("...")                                    │
│ }                                                              │
│                                                                 │
│ Indexes:                                                        │
│ - groupChatId (for fast message queries)                       │
│ - createdAt (for sorting)                                      │
│ - deletedAt (for soft delete filtering)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 9: Socket.IO Broadcast                                     │
│ Backend broadcasts to room members                              │
│                                                                 │
│ Two separate emissions:                                         │
│                                                                 │
│ A) To other users in room:                                     │
│    socket.to(groupChatId).emit('newMessage', message)          │
│    - Event: 'newMessage'                                       │
│    - Recipients: All users in room EXCEPT sender               │
│    - Data: Complete message object                             │
│                                                                 │
│ B) To sender (via callback):                                   │
│    callback({ success: true, message })                        │
│    - Resolves the Promise in frontend                          │
│    - Contains message with real _id                            │
│    - Used to replace optimistic message                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 10: Frontend Receives Response                             │
│                                                                 │
│ TWO PATHS:                                                      │
│                                                                 │
│ PATH A: Sender receives callback                               │
│ ├─ File: frontend/src/features/message/hooks/                  │
│ │        useGroupChatMessages.ts                               │
│ ├─ Function: sendMessage.onSuccess()                           │
│ ├─ Process:                                                     │
│ │  1. Receives server message with real _id                    │
│ │  2. Updates React Query cache:                               │
│ │     - Removes optimistic message (tempId)                    │
│ │     - Adds real message (_id)                                │
│ │  3. UI automatically re-renders with real message            │
│ └─ Result: Optimistic message replaced with real one           │
│                                                                 │
│ PATH B: Other users receive socket event                       │
│ ├─ File: frontend/src/contexts/SocketContext.tsx               │
│ ├─ Event Listener: socket.on('newMessage', callback)           │
│ ├─ Callback: Defined in useGroupChatMessages hook              │
│ ├─ Process:                                                     │
│ │  1. Socket receives 'newMessage' event                       │
│ │  2. Triggers registered callback                             │
│ │  3. Callback updates React Query cache                       │
│ │  4. Adds new message to messages array                       │
│ │  5. UI automatically re-renders                              │
│ └─ Result: New message appears in chat window                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 11: React Query Cache Update                               │
│ File: frontend/src/features/message/hooks/                     │
│       useGroupChatMessages.ts                                   │
│                                                                 │
│ Cache Key: ['messages', groupChatId]                           │
│                                                                 │
│ Update Methods:                                                 │
│                                                                 │
│ 1. Optimistic Update (onMutate):                               │
│    queryClient.setQueryData(['messages', groupChatId], (old) =>│
│      old.pages.map(page => ({                                  │
│        ...page,                                                │
│        messages: [...page.messages, optimisticMessage]         │
│      }))                                                       │
│    )                                                           │
│                                                                 │
│ 2. Real Message Update (onSuccess):                            │
│    queryClient.setQueryData(['messages', groupChatId], (old) =>│
│      old.pages.map(page => ({                                  │
│        ...page,                                                │
│        messages: page.messages.map(msg =>                      │
│          msg._id === tempId ? realMessage : msg                │
│        )                                                       │
│      }))                                                       │
│    )                                                           │
│                                                                 │
│ 3. Socket Event Update (socket.on('newMessage')):             │
│    queryClient.setQueryData(['messages', groupChatId], (old) =>│
│      old.pages.map((page, index) =>                           │
│        index === 0                                             │
│          ? { ...page, messages: [...page.messages, newMsg] }  │
│          : page                                                │
│      )                                                         │
│    )                                                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 12: UI Re-render                                           │
│ File: frontend/src/features/message/components/                │
│       MessageChatWindow/MessageChatWindow.tsx                  │
│                                                                 │
│ Component: MessageChatWindow                                    │
│                                                                 │
│ Data Source:                                                    │
│ const { messages, isLoading } = useGroupChatMessages(          │
│   groupChat._id                                                │
│ )                                                              │
│                                                                 │
│ Render Logic:                                                   │
│ {messages.map(message => (                                     │
│   <MessageBubble                                               │
│     key={message._id}                                          │
│     message={message}                                          │
│     isOwn={message.senderId === user._id}                      │
│   />                                                           │
│ ))}                                                            │
│                                                                 │
│ Auto-scroll:                                                    │
│ useEffect(() => {                                              │
│   if (messagesEndRef.current) {                                │
│     messagesEndRef.current.scrollIntoView({ behavior: 'smooth'│
│   }                                                            │
│ }, [messages])                                                 │
│                                                                 │
│ Result:                                                         │
│ - New message appears at bottom                                │
│ - Auto-scrolls to show new message                             │
│ - Sender sees their message confirmed                          │
│ - Recipients see new message instantly                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Frontend: Sending Message

### Component Hierarchy

```
MessagePage
└── MessageChatWindow
    ├── MessageChatHeader
    ├── MessageList (messages display)
    │   └── MessageBubble (individual messages)
    └── MessageInput ← USER TYPES HERE
```

### Step-by-Step Breakdown

#### 1. User Types Message

**Component:** `MessageInput.tsx`  
**Location:** `frontend/src/features/message/components/MessageInput/MessageInput.tsx`

```typescript
export const MessageInput: React.FC<MessageInputProps> = ({ groupChatId }) => {
    const [message, setMessage] = useState('');
    const { sendMessage } = useGroupChatMessages(groupChatId);

    const handleSendMessage = () => {
        // Validation
        if (!message.trim()) return;

        // Call mutation
        sendMessage.mutate({
            content: message.trim(),
            groupChatId,
            type: 'text',
            metadata: {},
        });

        // Clear input
        setMessage('');
    };

    return (
        <div className="message-input">
            <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};
```

**Key Points:**

-   Validates message is not empty
-   Trims whitespace
-   Clears input after sending
-   Supports Enter to send (Shift+Enter for new line)

---

#### 2. useGroupChatMessages Hook

**Hook:** `useGroupChatMessages`  
**Location:** `frontend/src/features/message/hooks/useGroupChatMessages.ts`

```typescript
export const useGroupChatMessages = (groupChatId: string) => {
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { user } = useAuthStore();

    // Send message mutation
    const sendMessage = useMutation({
        mutationFn: async (data: SendMessageData) => {
            return new Promise((resolve, reject) => {
                socket?.emit('createMessage', data, (response: any) => {
                    if (response.success) {
                        resolve(response.message);
                    } else {
                        reject(new Error(response.error));
                    }
                });
            });
        },

        onMutate: async newMessage => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ['messages', groupChatId],
            });

            // Snapshot previous value
            const previousMessages = queryClient.getQueryData([
                'messages',
                groupChatId,
            ]);

            // Optimistically update cache
            const tempId = `temp-${Date.now()}`;
            const optimisticMessage = {
                _id: tempId,
                content: newMessage.content,
                senderId: user?._id,
                groupChatId,
                type: newMessage.type,
                createdAt: new Date(),
                reactions: [],
                readBy: [],
            };

            queryClient.setQueryData(['messages', groupChatId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page: any, index: number) =>
                        index === 0
                            ? {
                                  ...page,
                                  messages: [
                                      ...page.messages,
                                      optimisticMessage,
                                  ],
                              }
                            : page
                    ),
                };
            });

            // Return context for rollback
            return { previousMessages, tempId };
        },

        onSuccess: (realMessage, variables, context) => {
            // Replace optimistic message with real one
            queryClient.setQueryData(['messages', groupChatId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        messages: page.messages.map((msg: any) =>
                            msg._id === context.tempId ? realMessage : msg
                        ),
                    })),
                };
            });
        },

        onError: (error, variables, context) => {
            // Rollback on error
            if (context?.previousMessages) {
                queryClient.setQueryData(
                    ['messages', groupChatId],
                    context.previousMessages
                );
            }
        },
    });

    return { sendMessage };
};
```

**Special Features:**

1. **Optimistic Updates:**

    - Message appears immediately in UI
    - Uses temporary ID (`temp-${Date.now()}`)
    - Updates React Query cache before server response

2. **Socket.IO Promise Wrapper:**

    - Wraps socket.emit in Promise
    - Resolves on success callback
    - Rejects on error callback

3. **Error Handling:**

    - Rolls back optimistic update on error
    - Restores previous state
    - Shows error message to user

4. **Context for Rollback:**
    - Stores previous messages
    - Stores temp ID
    - Used in onSuccess and onError

---

#### 3. Socket.IO Emit

**Context:** `SocketContext`  
**Location:** `frontend/src/contexts/SocketContext.tsx`

```typescript
const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { accessToken } = useAuthStore();

    useEffect(() => {
        if (!accessToken) return;

        // Connect to Socket.IO server
        const newSocket = io(SOCKET_URL, {
            auth: { token: accessToken },
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('✅ Socket connected:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
            console.log('❌ Socket disconnected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [accessToken]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};
```

**Key Points:**

-   Single socket instance per user
-   Auto-reconnect on disconnect
-   JWT token in auth header
-   WebSocket transport for better performance

---

## Backend: Processing Message

### Architecture

```
Socket.IO Server
├── Auth Middleware (validates JWT)
├── Event Handlers
│   └── Message Handler
│       ├── Validation Middleware
│       └── Business Logic
└── Services
    └── Message Service
        └── MongoDB Operations
```

### Step-by-Step Breakdown

#### 1. Socket Connection & Auth

**File:** `backend/src/socket/middlewares/auth.middleware.ts`

```typescript
export const socketAuthMiddleware = async (
    socket: Socket,
    next: (err?: Error) => void
) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication token required'));
        }

        // Verify JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user to socket
        socket.data.user = {
            userId: decoded.userId,
            email: decoded.email,
            username: decoded.username,
        };

        next();
    } catch (error) {
        next(new Error('Invalid token'));
    }
};
```

**Process:**

1. Extracts token from handshake
2. Verifies JWT signature
3. Decodes user info
4. Attaches to `socket.data.user`
5. Allows connection or rejects

---

#### 2. Event Handler Registration

**File:** `backend/src/socket/index.ts`

```typescript
export const setupSocket = (io: Server) => {
    // Apply auth middleware
    io.use(socketAuthMiddleware);

    // Connection handler
    io.on('connection', (socket: Socket) => {
        const user = socket.data.user;
        console.log(`✅ User connected: ${user.username}`);

        // Register message events
        socket.on('createMessage', (data, callback) =>
            messageHandlers.createMessage(socket, data, callback)
        );

        socket.on('updateMessage', (data, callback) =>
            messageHandlers.updateMessage(socket, data, callback)
        );

        // ... other events

        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${user.username}`);
        });
    });
};
```

**Key Points:**

-   Each event handler receives (socket, data, callback)
-   Socket instance is explicitly bound
-   Callback for acknowledgment
-   Disconnect cleanup automatic

---

#### 3. Validation Middleware

**File:** `backend/src/socket/middlewares/validate.middleware.ts`

```typescript
export const withValidation = <T>(
    schema: z.ZodSchema<T>,
    handler: (socket: Socket, data: T, callback?: any) => void | Promise<void>
) => {
    return async (socket: Socket, data: any, callback?: any) => {
        try {
            // Validate with Zod
            const validatedData = schema.parse(data);

            // Call handler with validated data
            await handler(socket, validatedData, callback);
        } catch (error) {
            if (error instanceof ZodError) {
                if (callback) {
                    callback({
                        success: false,
                        error: 'Validation error',
                        details: error.errors,
                    });
                } else {
                    socket.emit('error', {
                        message: 'Validation error',
                    });
                }
            }
        }
    };
};
```

**Validation Schema:**

```typescript
// backend/src/types/message/message.socket.ts
export const CreateMessageSocketSchema = z.object({
    groupChatId: z.string().min(1),
    content: z.string().min(1),
    type: z.enum(['text', 'image', 'file']),
    replyBy: z.string().optional(),
    metadata: z.record(z.any()).optional(),
});
```

---

#### 4. Message Handler

**File:** `backend/src/socket/handlers/message.handler.ts`

```typescript
export const handleCreateMessage = withValidation(
    CreateMessageSocketSchema,
    async (socket: Socket, data: CreateMessageSocketData, callback?: any) => {
        try {
            // Get user ID from socket
            const userId = socket.data.user.userId;

            // Create message in database
            const newMessage = await messageService.createMessage({
                groupChatId: new Types.ObjectId(data.groupChatId),
                senderId: new Types.ObjectId(userId),
                content: data.content,
                type: data.type,
                replyBy: data.replyBy
                    ? new Types.ObjectId(data.replyBy)
                    : undefined,
                metadata: data.metadata,
            });

            // Broadcast to room (except sender)
            socket.to(data.groupChatId).emit('newMessage', newMessage);

            // Acknowledge to sender
            if (callback) {
                callback({
                    success: true,
                    message: newMessage,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to create message',
                });
            }
        }
    }
);
```

**Process:**

1. Extract userId from socket.data
2. Call message service
3. Broadcast to room members
4. Send acknowledgment to sender

---

#### 5. Message Service

**File:** `backend/src/services/message.service.ts`

```typescript
class MessageService {
    async createMessage(data: CreateMessageData): Promise<Message> {
        // Create message document
        const message = await Message.create({
            groupChatId: data.groupChatId,
            senderId: data.senderId,
            content: data.content,
            type: data.type,
            replyBy: data.replyBy,
            metadata: data.metadata,
            reactions: [],
            readBy: [
                {
                    userId: data.senderId,
                    readAt: new Date(),
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Populate sender info
        await message.populate('senderId', 'username email avatar');

        // Update group chat last message time
        await GroupChat.updateOne(
            { _id: data.groupChatId },
            { lastMessageAt: new Date() }
        );

        return message;
    }
}

export default new MessageService();
```

**Database Operations:**

1. Create message document
2. Populate sender details
3. Update group chat metadata
4. Return populated message

---

## Frontend: Receiving Message

### Two Scenarios

#### Scenario A: Sender Receives Confirmation

**Flow:**

1. Socket callback resolves Promise
2. `sendMessage.onSuccess` triggered
3. Replace optimistic message with real message
4. UI updates automatically

**Code:**

```typescript
// In useGroupChatMessages.ts
onSuccess: (realMessage, variables, context) => {
    queryClient.setQueryData(['messages', groupChatId], (old: any) => {
        return {
            ...old,
            pages: old.pages.map((page: any) => ({
                ...page,
                messages: page.messages.map((msg: any) =>
                    msg._id === context.tempId ? realMessage : msg
                ),
            })),
        };
    });
};
```

---

#### Scenario B: Other Users Receive New Message

**Setup Socket Listener:**

```typescript
// In useGroupChatMessages.ts
useEffect(() => {
    if (!socket || !groupChatId) return;

    const handleNewMessage = (message: Message) => {
        queryClient.setQueryData(['messages', groupChatId], (old: any) => {
            if (!old) return old;
            return {
                ...old,
                pages: old.pages.map((page: any, index: number) =>
                    index === 0
                        ? {
                              ...page,
                              messages: [...page.messages, message],
                          }
                        : page
                ),
            };
        });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
        socket.off('newMessage', handleNewMessage);
    };
}, [socket, groupChatId, queryClient]);
```

**Process:**

1. Socket receives 'newMessage' event
2. Handler updates React Query cache
3. Adds message to first page
4. React Query triggers re-render
5. MessageChatWindow displays new message

---

## Code References

### Frontend Files

| File                      | Purpose            | Key Functions             |
| ------------------------- | ------------------ | ------------------------- |
| `MessageInput.tsx`        | User input         | `handleSendMessage()`     |
| `useGroupChatMessages.ts` | Message management | `sendMessage`, `messages` |
| `SocketContext.tsx`       | Socket connection  | `useSocket()`             |
| `MessageChatWindow.tsx`   | Display messages   | Render logic              |
| `MessageBubble.tsx`       | Individual message | Message UI                |

### Backend Files

| File                                        | Purpose          | Key Functions           |
| ------------------------------------------- | ---------------- | ----------------------- |
| `socket/index.ts`                           | Socket setup     | `setupSocket()`         |
| `socket/middlewares/auth.middleware.ts`     | Auth             | `socketAuthMiddleware`  |
| `socket/middlewares/validate.middleware.ts` | Validation       | `withValidation()`      |
| `socket/handlers/message.handler.ts`        | Message handlers | `handleCreateMessage()` |
| `services/message.service.ts`               | Business logic   | `createMessage()`       |
| `models/Message.ts`                         | Data model       | Mongoose schema         |

---

## Troubleshooting

### Common Issues

#### 1. Message not sending

**Symptoms:** Click send, nothing happens

**Debug Steps:**

```typescript
// In MessageInput.tsx
const handleSendMessage = () => {
    console.log('1. Send clicked, message:', message);

    if (!message.trim()) {
        console.log('2. Message empty, aborting');
        return;
    }

    console.log('3. Calling sendMessage.mutate');
    sendMessage.mutate({
        content: message.trim(),
        groupChatId,
        type: 'text',
    });
};

// In useGroupChatMessages.ts
mutationFn: async data => {
    console.log('4. mutationFn called with:', data);
    console.log('5. Socket:', socket);

    return new Promise((resolve, reject) => {
        socket?.emit('createMessage', data, response => {
            console.log('6. Server response:', response);
            if (response.success) {
                resolve(response.message);
            } else {
                reject(new Error(response.error));
            }
        });
    });
};
```

**Common Causes:**

-   Socket not connected
-   Invalid groupChatId
-   Empty message
-   Network error

---

#### 2. Optimistic update not working

**Symptoms:** Message doesn't appear immediately

**Check:**

```typescript
onMutate: async newMessage => {
    console.log('onMutate called');
    console.log(
        'Previous data:',
        queryClient.getQueryData(['messages', groupChatId])
    );

    // ... optimistic update code

    console.log(
        'After update:',
        queryClient.getQueryData(['messages', groupChatId])
    );
};
```

**Common Causes:**

-   Query key mismatch
-   Cache not initialized
-   Invalid data structure

---

#### 3. Other users not receiving message

**Symptoms:** Sender sees message, others don't

**Backend Debug:**

```typescript
// In message.handler.ts
socket.to(data.groupChatId).emit('newMessage', newMessage);
console.log('Broadcasted to room:', data.groupChatId);
console.log('Room members:', await io.in(data.groupChatId).allSockets());
```

**Frontend Debug:**

```typescript
// In useGroupChatMessages.ts
useEffect(() => {
    const handleNewMessage = message => {
        console.log('Received newMessage event:', message);
        // ... update cache
    };

    socket.on('newMessage', handleNewMessage);
    console.log('Listening for newMessage on socket:', socket.id);

    return () => {
        socket.off('newMessage', handleNewMessage);
    };
}, [socket]);
```

**Common Causes:**

-   Users not in same room
-   Socket listener not registered
-   Event name mismatch

---

#### 4. Duplicate messages

**Symptoms:** Same message appears multiple times

**Causes:**

-   Multiple socket listeners
-   Not cleaning up listeners
-   Multiple mutations

**Fix:**

```typescript
useEffect(() => {
    if (!socket) return;

    const handler = msg => {
        /* ... */
    };

    socket.on('newMessage', handler);

    // IMPORTANT: Cleanup
    return () => {
        socket.off('newMessage', handler);
    };
}, [socket, groupChatId]); // Proper dependencies
```

---

## Performance Optimizations

### 1. Pagination

```typescript
const { messages, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['messages', groupChatId],
    queryFn: ({ pageParam = 1 }) =>
        messageService.getMessages(groupChatId, pageParam),
    getNextPageParam: lastPage => lastPage.nextPage,
});
```

### 2. Virtual Scrolling

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
});
```

### 3. Debounced Typing Indicator

```typescript
const debouncedTyping = useMemo(
    () =>
        debounce((isTyping: boolean) => {
            socket?.emit('typing', { groupChatId, isTyping });
        }, 300),
    [socket, groupChatId]
);
```

---

## Summary

### Message Flow Timeline

```
0ms   - User types and clicks send
1ms   - handleSendMessage() validates
2ms   - sendMessage.mutate() called
3ms   - onMutate: Optimistic update
4ms   - UI shows message immediately
5ms   - Socket.emit('createMessage')
------- Network latency -------
50ms  - Backend receives event
51ms  - Auth middleware validates
52ms  - Validation middleware checks data
53ms  - Handler creates message in DB
54ms  - Database saves message
55ms  - Handler broadcasts to room
56ms  - Handler sends callback to sender
------- Network latency -------
100ms - Frontend receives callback
101ms - onSuccess: Replace optimistic msg
102ms - Other users receive 'newMessage'
103ms - Their caches update
104ms - All UIs re-render
105ms - Message visible to everyone
```

### Key Takeaways

1. **Optimistic Updates** = Instant UX
2. **Socket.IO** = Real-time sync
3. **React Query** = Cache management
4. **Validation** = Data integrity
5. **Error Handling** = Reliability

---

**Last Updated:** 2025-12-31  
**Version:** 1.0.0  
**Author:** Flager Development Team
