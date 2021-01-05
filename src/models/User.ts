import { Association, Optional, Model } from 'sequelize';
import { Sequelize, DataTypes, ModelAttributeColumnOptions, FindAttributeOptions } from 'sequelize';

interface UserEntry {
  id: number;
  name: string;
  mail: string;
  password: string;
  creationDate: Date;
  active: boolean;
}

interface UserCreationAttributes extends Optional<UserEntry, 'id' | 'active' | 'creationDate'> {}

export class UserModel extends Model<UserEntry, UserCreationAttributes> {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public mail!: string;
  public password!: string;
  public creationDate!: Date;
  public active!: boolean;
}

export function connectUserModel(sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      mail: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      creationDate: {
        type: new DataTypes.DATE(),
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize, // passing the `sequelize` instance is required
      tableName: 'Users',
      timestamps: false,
      indexes: [
        // Create a unique index
        {
          fields: ['name'],
        },
        {
          fields: ['mail'],
        },
      ],
    },
  );
}
