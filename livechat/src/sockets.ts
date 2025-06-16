import { Server } from "socket.io"
import { FastifyInstance } from "fastify"
import { isBlocked } from "./services/databaseService"
import { runDbAsync } from "./databaseServices"
import { msgCmdCheck, sendMessageToSocket } from "./services/msgService"
import { CommandResult } from "./interfaces/types"

const onlineUserSockets = new Map<string, string>

export async function initSockets(fastify: FastifyInstance)
{
    const io = new Server(fastify.server)
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;
        onlineUserSockets.set(userId, socket.id)
        console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'connected');
        socket.join(userId);
        socket.on('disconnect', () => 
        {
            console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'disconnected');
            onlineUserSockets.delete(userId)
        })
        socket.on('emit-chat-message', async ({ to, msg }) => {
            console.log(userId + " " + to + " " + msg);
            
            const targetSocket = onlineUserSockets.get(to)
            
            try {
                await sendMessageToSocket(io,targetSocket,userId,to,msg)
            } catch (error) {
                console.log(error)
            }

        });
    });
}