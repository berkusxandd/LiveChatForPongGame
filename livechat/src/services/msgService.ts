import { Server } from "socket.io";
import { runDbAsync } from "../databaseServices";
import { CommandResult } from "../interfaces/types"
import { blockUser, unblockUser } from "./chatServices"
import { isBlocked } from "./databaseService";


export async function sendMessageToSocket(io: Server, targetSocket: any, userId: string, to: string, msg: string)
{
    if (targetSocket)
    {
        const cmdResult: CommandResult = await msgCmdCheck(msg,userId,to)
        if (cmdResult.error)
        {
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

export async function msgCmdCheck(msg: string, sender_id: string, receiver_id: string): Promise<CommandResult>
{
    if (msg.startsWith('/block'))
    {
        console.error("BLOCK TRIGERERERED")
        const result: CommandResult = await blockUser(sender_id, receiver_id)
        return result;
    }
    else if (msg.startsWith('/pardon'))
    {
        console.error("PARDON TRIGERERERED")
        const result: CommandResult = await unblockUser(sender_id, receiver_id)
        return result;
    }
    else
    {
        return ({error:null,replyMessage: "It is not a command"})
    }
}
