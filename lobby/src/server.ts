import Fastify, { FastifyRequest } from "fastify"
import { initDb } from "./database"
import lobbiesRoutes from "./lobbiesRoutes";
import { Sequelize } from "sequelize";
import { sequelize } from "./sequelize_init";

async function buildServer() {
    try 
    {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } 
    catch (error) 
    {
        console.error('Unable to connect to the database:', error)
        process.exit(1)
    }

    const fastify = Fastify({logger: true})
    fastify.register(lobbiesRoutes)
    initDb(sequelize);
    await sequelize.sync({ alter: true });
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