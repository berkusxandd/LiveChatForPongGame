import { db } from "./database";

export async function getLobbies(lobby_id: number): Promise<any> 
{
    const lobbyRows = await new Promise<any>((resolve, reject) => {
        db.get('SELECT * FROM lobbies WHERE id = ?', [lobby_id], (err, row) => {
            if (err) return reject({statusCode: 500, message: "Database error (lobbies)"})
            if (!row) return reject({statusCode: 404, message: "Lobby is not found"})
            resolve(row)
        })
    })

    const usersInLobby = await new Promise<any>((resolve, reject) => {
        db.all('SELECT * FROM user_lobbies WHERE lobby_id = ?',[lobby_id], (err, rows) => {
            if (err) return reject ({statusCode: 500, message: "Database error while getting all the users from the lobby"})
            resolve(rows)
        })
    })

    return {lobby: lobbyRows,users:usersInLobby}
}

export async function createLobby(name: string, capacity: number, creator_id: number): Promise<void>
{
    const lobbyId = await new Promise<number> ((resolve, reject) => {
        db.run('INSERT INTO lobbies (name, capacity, creator_id) VALUES (?, ?, ?)', [name, capacity, creator_id], function (this: {lastID: number}, err){
            if (err) return reject({statusCode: 500, message: "Database error (lobbies)"})
            resolve(this.lastID)
        })
    })

    await new Promise<void>((resolve, reject) => {
        db.run('INSERT INTO user_lobbies (user_id, lobby_id) VALUES (?, ?)',[creator_id, lobbyId], (err) => {
            if (err) return reject({statusCode: 500, message: "Database error inserting creator to the lobby"})
            resolve()
        })
    })

}

export async function joinLobby(userId: number, lobbyId: number): Promise<void>
{
    const existing = await new Promise<any>((resolve, reject) => {
        db.get('SELECT * FROM user_lobbies WHERE user_id = ?',[userId],(err,row) => {
            if(err) return reject({statusCode: 500, message: "Database error (user_lobbies)"})
            resolve(row)
        })
    })

    if (existing)
    {
        throw {statusCode: 400, message: "User is already in another lobby"}
    }

    await new Promise<void>((resolve, reject) => {
        db.run('INSERT INTO user_lobbies (user_id, lobby_id) VALUES (?, ?)',[userId,lobbyId], (err) => {
            if (err) return reject({statusCode: 500, message: "Database error while inserting user to user_lobbies"})
            resolve()
        })
    })
}