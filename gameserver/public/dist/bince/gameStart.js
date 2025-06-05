import socket from "../socket.js";
import { ball, gameStates, rightPaddle } from "../state.js";
export const gameStart = async () => {
    const status = document.getElementById("status");
    const canvas = document.getElementById("gameCanvas");
    socket.on("connect", () => {
        console.log("im client and i connected");
    });
    socket.on("ball-update", (serverball) => {
        ball.x = serverball.x;
        ball.y = serverball.y;
    });
    socket.on("paddle-position-0", (pos) => {
        rightPaddle.y = pos;
    });
    await new Promise((resolve) => {
        socket.on("ready", (playerI) => {
            if (playerI == 1) {
                gameStates.playerIndex = true;
            }
            setTimeout(() => {
                canvas.style.display = "block";
                status.style.display = "none";
                resolve();
            }, 1000);
        });
    });
};
