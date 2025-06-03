import Lobby from "./models/lobby.models";
import UserLobby from "./models/user_lobbies.models";

export async function getLobbies(lobby_id: number): Promise<any> 
{
     try {
    const lobby = await Lobby.findByPk(lobby_id);

    if (!lobby) {
      throw { statusCode: 404, message: "Lobby is not found" };
    }

    const usersInLobby = await UserLobby.findAll({
      where: { lobby_id }
    });

    return { lobby, users: usersInLobby };
  } catch (error) {
    throw { statusCode: 500, message: "Database error retrieving lobby or users", details: error };
  }
}

export async function createLobby(name: string, capacity: number, creator_id: number): Promise<void> {
  try {
    const lobby = await Lobby.create({
      name,
      capacity,
      creator_id,
    });
    await UserLobby.create({
      user_id: creator_id,
      lobby_id: lobby.id,
    });
  } catch (error) {
    throw { statusCode: 500, message: "Database error creating lobby or user_lobby", details: error };
  }
}

export async function joinLobby(userId: number, lobbyId: number): Promise<void>
{
  try {
    const existing = await UserLobby.findOne({ where: { user_id: userId } });

    if (existing) {
      throw { statusCode: 400, message: "User is already in another lobby" };
    }

    await UserLobby.create({
      user_id: userId,
      lobby_id: lobbyId,
    });
  } catch (error: any) {
    if (error.statusCode && error.message) {
      throw error;
    }
    throw { statusCode: 500, message: "Database error while joining lobby", details: error };
  }
}