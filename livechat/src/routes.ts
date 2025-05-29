import { FastifyInstance } from "fastify";
import db from "./database";

export async function registerRoutes(fastify: FastifyInstance)
{
    fastify.get("/", (req,res) => {
        return ({message: "hello"})
    })

    fastify.get('/messages/:user1/:user2', (req, reply) => {
    const { user1, user2 } = req.params as { user1: string; user2: string };
    db.all(
    `SELECT * FROM messages 
     WHERE (sender_id = ? AND receiver_id = ?) 
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC`,
    [user1, user2, user2, user1],
    (err, rows) => {
      if (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Database error' });
      }
      reply.send(rows);
    }
  );
});
    fastify.get("/chat", (req, reply) => {
    reply.type('text/html').sendFile('index.html')
    })
}