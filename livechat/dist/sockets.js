"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockets = initSockets;
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./database"));
const onlineUserSockets = new Map;
function initSockets(fastify) {
    const io = new socket_io_1.Server(fastify.server);
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;
        onlineUserSockets.set(userId, socket.id);
        console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'connected');
        socket.join(userId);
        socket.on('disconnect', () => {
            console.log(userId + ' (' + onlineUserSockets.get(userId) + ') ' + 'disconnected');
            onlineUserSockets.delete(userId);
        });
        socket.on('emit-chat-message', ({ to, msg }) => {
            console.log(userId + " " + to + " " + msg);
            const targetSocket = onlineUserSockets.get(to);
            if (targetSocket) {
                io.to(targetSocket).emit('get-chat-message', {
                    from: userId,
                    msg: msg
                });
            }
            //TO-DO database check if user exists
            database_1.default.run(`INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`, [userId, to, msg], (err) => {
                if (err) {
                    console.error("Failed to insert message:", err);
                }
                else {
                    console.log("Message stored in DB");
                }
            });
        });
    });
}
