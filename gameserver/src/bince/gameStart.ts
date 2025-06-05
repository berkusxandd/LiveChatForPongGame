declare const io: (url: string) => import("socket.io-client").Socket;
export const gameStart = () =>
{
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
        console.log("im client and i connected")
    })
}