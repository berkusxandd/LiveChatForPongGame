import { ball } from "../state.js";

declare const io: (url: string) => import("socket.io-client").Socket;

export const gameStart = async () =>
{
    const status = document.getElementById("status")!;
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
        console.log("im client and i connected")
    })

    socket.on("ball-update", (serverball) => {
        ball.x = serverball.x
        ball.y = serverball.y
    })
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