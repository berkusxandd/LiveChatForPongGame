declare const io: (url: string) => import("socket.io-client").Socket;
const socket = io("http://localhost:3000");
export default socket;