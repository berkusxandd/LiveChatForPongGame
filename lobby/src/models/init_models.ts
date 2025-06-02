import { defineLobbyModel } from './lobby.models';
import { sequelize } from '../sequelize_init';
import { defineUserLobbyModel } from './user_lobbies.models';

export const LobbyModel = defineLobbyModel(sequelize);
export const UserLobbyModel = defineUserLobbyModel(sequelize);
