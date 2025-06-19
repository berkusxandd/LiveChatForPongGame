import { Server } from "socket.io";
import { runDbAsync } from "../databaseServices";
import { CommandResult } from "../interfaces/types"
import { blockUser, msgCmdCheck, unblockUser } from "./msgCmdServices"
import { isBlocked } from "./databaseService";


export async function sendMessageToSocket(io: Server, targetSocket: any, userId: string, to: string, msg: string)
{
    if (targetSocket)
    {
        const cmdResult: CommandResult = await msgCmdCheck(msg,userId,to)
        if (cmdResult.error)
        {
            console.error("there is an error");
            console.log(cmdResult.error);
        }
        if (cmdResult.replyMessage === "It is not a command")
        {
            const isBlock = await isBlocked(userId, to)
            if (!isBlock)
            {
            io.to(targetSocket).emit('get-chat-message', {
            from: userId,
            msg: msg
            });
            }
        }
    }
        //TO-DO database check if user exists
        try {
        await runDbAsync(`INSERT INTO messages (sender_id, receiver_id, message)
                        VALUES (?, ?, ?)`,[userId,to,msg]);
        console.log("Message stored in DB");
        }   catch (err) {
        console.error("Failed to insert message:", err);
        throw err
    }
}
