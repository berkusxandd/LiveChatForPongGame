import Fastify from 'fastify';
import { initSocket } from './initSocket.js';
import fastifyCors from '@fastify/cors';
const PORT = 3000;
export const rooms = new Map();
async function buildServer() {
    const fastify = Fastify({ logger: true });
    await fastify.register(fastifyCors, {
        origin: ["http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
    });
    fastify.get('/api/ping', async (req, reply) => {
        return { pong: true };
    });
    fastify.listen({ port: PORT }, (err, address) => {
        initSocket(fastify);
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server running at ${address}`);
    });
}
buildServer();
