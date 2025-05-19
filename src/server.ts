import Fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "path"
import { Server, Socket } from "socket.io"
import { createServer } from "http"


async function buildServer() {
    const fastify = Fastify({logger: true})
    fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend'),
    prefix: '/'
    })

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
    socket.on('disconnect', () => 
    {
        console.log('a user disconnected');
    })
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
  });
    });

    await fastify.listen({
        port: 3000,
        host: "0.0.0.0"
    })
}

buildServer()