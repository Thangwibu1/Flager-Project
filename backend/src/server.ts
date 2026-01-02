import { httpServer, io } from './app';
import { config } from './config/env.config';
import { connectMongoDB } from './config/database/mongodb.config';
import { redisClient } from './config/database/redis.config';
import { neo4jClient } from './config/database/neo4j.config';
import { setupSocket } from './socket';

const startServer = async () => {
    try {
        // Connect to databases
        await connectMongoDB();
        await redisClient.connect();
        // Neo4j connects automatically on initialization

        // Setup Socket.IO với tất cả handlers và middlewares
        setupSocket(io);

        // Start server
        httpServer.listen(config.port, () => {
            console.log(`🚀 Server running on port ${config.port}`);
            console.log(`📝 Environment: ${config.env}`);
            console.log(
                `🌐 API: http://localhost:${config.port}/api/${config.apiVersion}`
            );
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await redisClient.disconnect();
    await neo4jClient.close();
    process.exit(0);
});

startServer();
