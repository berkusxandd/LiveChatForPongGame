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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToSocket = sendMessageToSocket;
exports.msgCmdCheck = msgCmdCheck;
const databaseServices_1 = require("../databaseServices");
const chatServices_1 = require("./chatServices");
const databaseService_1 = require("./databaseService");
function sendMessageToSocket(io, targetSocket, userId, to, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (targetSocket) {
            const cmdResult = yield msgCmdCheck(msg, userId, to);
            if (cmdResult.error) {
                console.log(cmdResult.error);
            }
            if (cmdResult.replyMessage === "It is not a command") {
                const isBlock = yield (0, databaseService_1.isBlocked)(userId, to);
                if (!isBlock) {
                    io.to(targetSocket).emit('get-chat-message', {
                        from: userId,
                        msg: msg
                    });
                }
            }
        }
        //TO-DO database check if user exists
        try {
            yield (0, databaseServices_1.runDbAsync)(`INSERT INTO messages (sender_id, receiver_id, message)
                        VALUES (?, ?, ?)`, [userId, to, msg]);
            console.log("Message stored in DB");
        }
        catch (err) {
            console.error("Failed to insert message:", err);
            throw err;
        }
    });
}
function msgCmdCheck(msg, sender_id, receiver_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.startsWith('/block')) {
            console.error("BLOCK TRIGERERERED");
            const result = yield (0, chatServices_1.blockUser)(sender_id, receiver_id);
            return result;
        }
        else if (msg.startsWith('/pardon')) {
            console.error("PARDON TRIGERERERED");
            const result = yield (0, chatServices_1.unblockUser)(sender_id, receiver_id);
            return result;
        }
        else {
            return ({ error: null, replyMessage: "It is not a command" });
        }
    });
}
