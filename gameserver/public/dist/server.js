import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { Server } from "socket.io";
import newPlayerJoined from './bince/roomService.js';
const PORT = 3000;
export const rooms = new Map();
async function buildServer() {
    const fastify = Fastify({ logger: true });
    fastify.register(fastifyStatic, {
        root: path.join(process.cwd(), 'public'),
        prefix: '/',
    });
    fastify.get('/', (_, reply) => {
        reply.sendFile('index.html');
    });
    fastify.get('/api/ping', async (req, reply) => {
        return { pong: true };
    });
    fastify.listen({ port: PORT }, (err, address) => {
        const io = new Server(fastify.server, {
            cors: { origin: "*" }
        });
        io.on("connection", (socket) => {
            console.log("New client connected");
            newPlayerJoined(socket, io, "first");
        });
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server running at ${address}`);
    });
}
buildServer();
