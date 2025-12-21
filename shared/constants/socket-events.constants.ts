export const SOCKET_EVENTS = {
  // Connection
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  // Messages
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
  TYPING_START: "typing_start",
  TYPING_STOP: "typing_stop",

  // Notifications
  NEW_NOTIFICATION: "new_notification",

  // Presence
  USER_ONLINE: "user_online",
  USER_OFFLINE: "user_offline",
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
