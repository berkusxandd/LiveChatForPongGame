import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { db } from "./database";
import { createLobby, getLobbies, joinLobby } from "./lobbyService";
const lobbiesRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) =>
{

//to create lobbies, requries lobby name, capacity, user (admin)
fastify.post('/create-lobby', async (request, reply) => {
    const { name, capacity, creator_id } = request.body as { name: string; capacity: number; creator_id: number };
    try {
      await createLobby(name,capacity,creator_id)
      reply.send({message: "Lobby created, creator added", name, capacity, creator_id})
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({message: error.message})
    }
  })

  fastify.post('/join-lobby', async (request, reply) => 
  {
    const { lobbyId, userId } = request.body as { lobbyId: number; userId: number;}
    try {
      await joinLobby(userId, lobbyId)
      reply.send({message: "User succesfully joined to lobby",userId,lobbyId})
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({message: error.message})
    }
  })

fastify.get('/get-lobby/:lobbyId', async (request: any, reply: any) => 
{
  const {lobbyId} = request.params as {lobbyId: string}
  const lobbyIdInt = parseInt(lobbyId, 10)
  try {
    const lobbyInfos = await getLobbies(lobbyIdInt)
    reply.send(lobbyInfos)
  } catch (error: any) {
    reply.code(500).send({message: error.message})
  }
})

}

export default lobbiesRoutes