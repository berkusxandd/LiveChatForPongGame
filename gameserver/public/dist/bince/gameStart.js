import { ball } from "../state.js";
export const gameStart = async () => {
    const status = document.getElementById("status");
    const canvas = document.getElementById("gameCanvas");
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
        console.log("im client and i connected");
    });
    socket.on("ball-update", (serverball) => {
        ball.x = serverball.x;
        ball.y = serverball.y;
    });
    await new Promise((resolve) => {
        socket.on("ready", () => {
            setTimeout(() => {
                canvas.style.display = "block";
                status.style.display = "none";
                resolve();
            }, 1000);
        });
    });
};
