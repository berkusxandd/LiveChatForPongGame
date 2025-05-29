import Fastify, { FastifyRequest } from "fastify"
import { initDb } from "./database"
import lobbiesRoutes from "./lobbiesRoutes";


async function buildServer() {
    
    const fastify = Fastify({logger: true})
    fastify.register(lobbiesRoutes)
    initDb();
    fastify.get("/", (req,res) =>
    {
        res.send({message:"hello from tournament api!"})
    })
    await fastify.listen({
        port: 3001,
        host: "0.0.0.0"
    })
}

buildServer()