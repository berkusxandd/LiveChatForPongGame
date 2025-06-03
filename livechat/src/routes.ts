import { FastifyInstance } from "fastify";
import Message from "./models/messages.models";
import { Op } from "sequelize";

export async function registerRoutes(fastify: FastifyInstance)
{
    fastify.get("/", (req,res) => {
        return ({message: "hello"})
    })

fastify.get('/messages/:user1/:user2', async (req, reply) => {
  const { user1, user2 } = req.params as { user1: string; user2: string };

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
        ],
      },
      order: [['timestamp', 'ASC']],
    });

    reply.send(messages);
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Database error' });
  }
});
    fastify.get("/chat", (req, reply) => {
    reply.type('text/html').sendFile('index.html')
    })
}