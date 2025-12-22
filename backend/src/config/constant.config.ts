
const redisPrefix = {
  blacklist: "blacklist", // `blacklist:${accessToken}` = 1
  refreshToken: "refreshToken", // `refreshToken:${userId}:${refreshToken}`
}

export {
  redisPrefix
}