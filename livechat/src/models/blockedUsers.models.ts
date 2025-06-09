import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import {sequelize} from '../sequelize_init';

class BlockedUser extends Model<InferAttributes<BlockedUser>, InferCreationAttributes<BlockedUser>> {
  declare id: CreationOptional<number>;
  declare blocker_id: string;
  declare blocked_id: string;
}

BlockedUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blocker_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blocked_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'blocked_users',
    timestamps: false,
  }
);

export default BlockedUser;