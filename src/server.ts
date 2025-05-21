import createUsersTable from "./createUsersTable"
import Fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "path"
import { Server, Socket } from "socket.io"
import { createServer } from "http"
import createMessagesTable from "./createMessagesTable"


async function buildServer() {
    const fastify = Fastify({logger: true})
    fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend'),
    prefix: '/'
    })
    await createUsersTable()
    await createMessagesTable()
    fastify.get("/", (req,res) => {
        return ({message: "hello"})
    })

    fastify.get("/chat", (req, reply) => {
    reply.type('text/html').sendFile('index.html')
    })
    await fastify.ready();
    
    const io = new Server(fastify.server)
    
    io.on('connection', (socket) => {
    console.log('a user connected');
    const userId = socket.handshake.auth.userId;
    socket.join(userId);
    socket.on('disconnect', () => 
    {
        console.log('a user disconnected');
    })
    socket.on('chat message', ({ to, msg }) => {
        console.log(userId + " " + to + " " + msg);
        io.to(to).emit('chat message', {
        from: userId,
        msg: msg
    });
    });
    });

    await fastify.listen({
        port: 3000,
        host: "0.0.0.0"
    })
}

buildServer()