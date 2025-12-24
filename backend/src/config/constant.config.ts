const redisPrefix = {
    blacklist: 'blacklist', // `blacklist:${accessToken}` = 1
    refreshToken: 'refreshToken', // `refreshToken:${userId}:${refreshToken}`
};
/**
 *
 */
const neo4jInfo = {
    node: {
        user: 'User',
        post: 'Post',
        groupChat: 'GroupChat',
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
        post: {},
    },
};
export { redisPrefix, neo4jInfo };
