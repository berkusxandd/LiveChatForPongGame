import createUsersTable from "./createUsersTable"
import Fastify, { FastifyRequest } from "fastify"
import fastifyStatic from "@fastify/static"
import path from "path"
import { Server } from "socket.io"
import { createServer } from "http"
import createMessagesTable from "./createMessagesTable"
import db from "./database"
import { registerRoutes } from "./routes"
import { initSockets } from "./sockets"
import { addUsers } from "./createPsuedoUsers"

async function buildServer() {
    
    const fastify = Fastify({logger: true})
    fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend'),
    prefix: '/'
    })

    await createUsersTable()
    await addUsers();
    await createMessagesTable()
    await registerRoutes(fastify)
    await fastify.ready();
    
    initSockets(fastify)

    await fastify.listen({
        port: 3000,
        host: "0.0.0.0"
    })
}

buildServer()