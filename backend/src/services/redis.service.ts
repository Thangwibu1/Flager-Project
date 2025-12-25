import { redisClient } from "../config/database/redis.config";
class RedisService {
	async getDataByKey<T>(key: string): Promise<T | null> {
    const data = await redisClient.client.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }
	async setDataWithExpiredTime(key: string, value: any, ttl: number): Promise<boolean> {
		// trả về string "OK" tức đã lưu thành công vào redis 
		const isOk = await redisClient.client.setEx(key, ttl, JSON.stringify(value));
		return (isOk === "Ok");
	}
	async deleteDataByKey(key: string): Promise<void> {
		await redisClient.client.del(key);
	}
}
export default new RedisService();