import { Server } from "socket.io"
import { FastifyInstance } from "fastify"
import Message from "./models/messages.models"

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
            
            if (targetSocket)
                {
                    io.to(targetSocket).emit('get-chat-message', {
                        from: userId,
                        msg: msg
                    });
                }
                //TO-DO database check if user exists
                try {
                    await Message.create({
                        sender_id: userId,
                        receiver_id: to,
                        message: msg
                    });
                console.log("Message stored in DB");
                }   catch (err) {
                console.error("Failed to insert message:", err);
                }
        });
    });
}