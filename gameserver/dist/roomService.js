import { rooms } from "./server.js";
import { gameLoop } from "./serversidegame/game.js";
export default function newPlayerJoined(playerSocket, io, roomName) {
    if (!rooms.has(roomName)) {
        rooms.set(roomName, new Set());
        console.log("NEW ROOM CREATED");
    }
    else {
        if (rooms.get(roomName).size == 2) {
            io.to(playerSocket.id).emit("error", { message: "Room is full" });
            playerSocket.disconnect();
            return;
        }
    }
    const size = rooms.get(roomName).size;
    const newPlayerInfo = { socketid: playerSocket.id, playerIndex: size };
    rooms.get(roomName).add(newPlayerInfo);
    if (rooms.get(roomName).size == 2) {
        for (const player of rooms.get(roomName)) {
            io.to(player.socketid).emit("ready");
            gameLoop();
        }
    }
    else {
        console.log("ROOM SIZE IS " + rooms.get(roomName).size + " PLAYER SOCKET " + playerSocket.id);
    }
}
