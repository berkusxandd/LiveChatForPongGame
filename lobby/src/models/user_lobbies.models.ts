import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../sequelize_init';

class UserLobby extends Model<InferAttributes<UserLobby>, InferCreationAttributes<UserLobby>> {
  declare user_id: number;
  declare lobby_id: number;
}

UserLobby.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  //TO-DO: add reference
  lobby_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'user_lobbies',
  timestamps: false,
});

export default UserLobby