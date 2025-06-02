
import { Sequelize } from "sequelize";
import { defineLobbyModel } from "./models/lobby.models";
import { defineUserLobbyModel } from "./models/user_lobbies.models";

export function initDb(sequelize: Sequelize) {

  const LobbyModel = defineLobbyModel(sequelize)
  const UserLobbyModel = defineUserLobbyModel(sequelize)

  return { LobbyModel, UserLobbyModel };
}