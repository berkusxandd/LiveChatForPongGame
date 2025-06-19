import Fastify, { FastifyRequest } from "fastify"
import lobbiesRoutes from "./lobbiesRoutes";

async function buildServer() {
    const fastify = Fastify({logger: true})
    fastify.register(lobbiesRoutes, {prefix: "/api"})
    fastify.get("/", (req,res) =>
    {
        res.send({message:"hello from tournament api!"})
    })
    await fastify.listen({
        port: 3002,
        host: "0.0.0.0"
    })
}

buildServer()