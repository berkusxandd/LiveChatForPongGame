import { Server } from "socket.io"
import db from "./database"
import { FastifyInstance } from "fastify"

const onlineUserSockets = new Map<string, string>

export function initSockets(fastify: FastifyInstance)
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
        socket.on('emit-chat-message', ({ to, msg }) => {
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
                db.run(
                `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`,
                [userId, to, msg],
                (err) => {
                if (err) {
                console.error("Failed to insert message:", err);
                } else {
                console.log("Message stored in DB");
                }
                }
                );
        });
    });
}