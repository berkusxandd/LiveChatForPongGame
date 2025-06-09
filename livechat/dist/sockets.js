"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockets = initSockets;
const socket_io_1 = require("socket.io");
const messages_models_1 = __importDefault(require("./models/messages.models"));
const databaseService_1 = require("./databaseService");
const onlineUserSockets = new Map;
function initSockets(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
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
            socket.on('emit-chat-message', (_a) => __awaiter(this, [_a], void 0, function* ({ to, msg }) {
                console.log(userId + " " + to + " " + msg);
                const isBlock = yield (0, databaseService_1.isBlocked)(userId, to);
                if (isBlock)
                    return;
                const targetSocket = onlineUserSockets.get(to);
                if (targetSocket) {
                    io.to(targetSocket).emit('get-chat-message', {
                        from: userId,
                        msg: msg
                    });
                }
                //TO-DO database check if user exists
                try {
                    yield messages_models_1.default.create({
                        sender_id: userId,
                        receiver_id: to,
                        message: msg
                    });
                    console.log("Message stored in DB");
                }
                catch (err) {
                    console.error("Failed to insert message:", err);
                }
            }));
        });
    });
}
