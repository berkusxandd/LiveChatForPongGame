import { Server, Socket } from "socket.io"
import { FastifyInstance } from "fastify"
import { sendMessageToSocket } from "./services/msgService"

export const onlineUserSockets = new Map<string, Socket>

export async function initSockets(fastify: FastifyInstance)
{
    const io = new Server(fastify.server)
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;
        onlineUserSockets.set(userId, socket)
        console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'connected');
        socket.join(userId);
        socket.on('disconnect', () => 
        {
            console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'disconnected');
            onlineUserSockets.delete(userId)
        })
        socket.on('emit-chat-message', async ({ to, msg }) => {
            console.log(userId + " " + to + " " + msg);
            try {
                await sendMessageToSocket(io,userId,to,msg)
            } catch (error) {
                console.log(error)
            }

        });
    });
}