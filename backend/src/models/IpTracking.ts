import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class IpTracking extends Model<
  InferAttributes<IpTracking>,
  InferCreationAttributes<IpTracking>
> {
  declare id: CreationOptional<number>;
  declare ipAddress: string;
  declare loginAttempts: number;
  declare registrationAttempts: number;
  declare isBanned: boolean;
  declare banExpiresAt: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

IpTracking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    registrationAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    banExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "IpTracking",
  }
);

export default IpTracking;
