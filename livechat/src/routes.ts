import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import Message from "./models/messages.models";
import { Op } from "sequelize";
import BlockedUser from "./models/blockedUsers.models";
import { BlockUserBody, blockUserSchema } from "./schemas/blockUser.schemas";
import { GetMessagesBody, getMessagesSchema } from "./schemas/createMessage.schemas";

export async function registerRoutes(fastify: FastifyInstance)
{
    fastify.get("/", (req,res) => {
        return ({message: "hello"})
    })

fastify.get('/messages/:user1/:user2', async (req: FastifyRequest, reply: FastifyReply) => {
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

    fastify.post("/blockuser",{schema: blockUserSchema}, async (req: FastifyRequest<{Body: BlockUserBody}>,reply: FastifyReply) => {
      const { user1, user2 } = req.body as { user1: string; user2: string };

  try {
    const blocked = await BlockedUser.findOne({
      where: {
        [Op.or]: [
          { blocked_id: user2, blocker_id: user1 },
        ],
      }
    });

    if (!blocked)
    {
        await BlockedUser.create({
          blocked_id: user2,
          blocker_id: user1
      });
    }

    reply.send({message: "User succesfully blocked"})
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: 'Database error while inserting block' });
  }
      
    })
}