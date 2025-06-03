import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import {sequelize} from '../sequelize_init';

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  declare id: CreationOptional<number>;
  declare sender_id: string;
  declare receiver_id: string;
  declare message: string;
  declare timestamp: CreationOptional<Date>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: false,
  }
);

export default Message;