import { getDbAsync, runDbAsync } from "../databaseServices";
import { CommandResult } from "../interfaces/types";

export async function blockUser(blocker_user: string, blocked_user: string): Promise <CommandResult>
{
    const blocked = await getDbAsync(`SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?`, [blocker_user,blocked_user]);
    if (!blocked)
    {
        try {
            await runDbAsync(`INSERT INTO blocked_users (blocked_id, blocker_id) VALUES (?,?)`, [blocker_user, blocked_user])
            return ({error:null, replyMessage: "User is succesfully blocked."})
        } catch (error) {
            return ({error: error as Error, replyMessage: "Error occured while inserting blocked_users"})
        }
    }
    else
    {
        return ({error:null, replyMessage: "User is already blocked"})
    }
}

export async function unblockUser(blocker_user: string, blocked_user: string): Promise <CommandResult>
{
    const blocked = await getDbAsync(`SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?`, [blocker_user,blocked_user]);
    if (blocked)
    {
        try {
            await runDbAsync(`DELETE FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?`, [blocker_user, blocked_user])
            console.log("user is succesfully UNBLOCKED")
            return ({error:null, replyMessage: "User is succesfully unblocked."})
        } catch (error) {
            return ({error: error as Error, replyMessage: "Error occured while deleting blocked_users"})
        }
    }
    else
    {
        return ({error:null, replyMessage: "User is not blocked"})
    }
}