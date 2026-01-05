const redisPrefix = {
    blacklist: 'blacklist', // `blacklist:${accessToken}` = 1
    refreshToken: 'refreshToken', // `refreshToken:${userId}:${refreshToken}` = deviceId
};
/**
 *
 */
const neo4jInfo = {
    node: {
        user: 'User',
        post: 'Post',
        groupChat: 'GroupChat',
        comment: 'Comment',
    },
    rel: {
        // các quan hệ 1 chiều xuất phát từ node User
        user: {
            requestFriend: 'REQUEST_FRIEND',
            isFriend: 'IS_FRIEND',
            isIn: 'IS_IN',
            isAdmin: 'IS_ADMIN',
        },
        // Các quan hệ 1 chiều xuất phát từ node Post
        post: {
            react: "REACT"
        },
        comment: {
            user_send_react: "SEND_REACT"
        }
    },
};
export { redisPrefix, neo4jInfo };
