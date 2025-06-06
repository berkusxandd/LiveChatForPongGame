import socket from "./socket.js";
import { ball, gameStates, leftPaddle, match, rightPaddle } from "./state.js";

export const gameStart = async () =>
{
    const status = document.getElementById("status")!;
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

    socket.on("connect", () => {
        console.log("im client and i connected")
    })

        socket.on("error", (data) => {
            console.log(data.message)
            status.textContent = "Room is full"
        })
        
        socket.on("game-update", (data) => {
            ball.x = data.ball.x;
            ball.y = data.ball.y;
            rightPaddle.x = data.rightPaddle.x
            rightPaddle.y = data.rightPaddle.y
            leftPaddle.x = data.leftPaddle.x
            leftPaddle.y = data.leftPaddle.y,
            match.score[0] = data.score_0
            match.score[1] = data.score_1
        });

         socket.on("game-end", (data) => {
            canvas.style.display = "none"
            status.style.display = "block"
            status.textContent = "Match Ended"
        });
  
    await new Promise<void>((resolve) => {
        socket.on("ready", () => {
            setTimeout(() => {
            canvas.style.display = "block"
            status.style.display = "none"
            resolve()
        }, 1000)

        })
    })

}