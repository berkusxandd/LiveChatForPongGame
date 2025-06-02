import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export function defineLobbyModel(sequelize: Sequelize) {
  class Lobby extends Model<InferAttributes<Lobby>, InferCreationAttributes<Lobby>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare capacity: number;
    declare creator_id: number;
  }

  Lobby.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    creator_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'Lobby',
    tableName: 'lobbies',
    timestamps: false,
  });

  return Lobby;
}