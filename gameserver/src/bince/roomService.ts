import { Server, Socket } from "socket.io";
import { rooms } from "../server.js";
import { gameLoop } from "./serversidegame/game.js";
export default function newPlayerJoined(playerSocket : Socket, io: Server, roomName: string)
{
    if (!rooms.has(roomName))
    {
        rooms.set(roomName, new Set());
        console.log("NEW ROOM CREATED")
    }

    rooms.get(roomName)!.add(playerSocket.id)

    if (rooms.get(roomName)!.size == 2)
    {
        for ( const socketID of rooms.get(roomName)!)
        {
            io.to(socketID).emit("ready", {})
            gameLoop(io)
        }
    }else
    {
        console.log("ROOM SIZE IS " + rooms.get(roomName)!.size + " PLAYER SOCKET " + playerSocket.id)
    }
}