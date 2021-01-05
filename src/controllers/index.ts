import { Sequelize } from 'sequelize';
import { UserModel, connectUserModel } from '../models/User';

class DBController {
  constructor() {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'LocalStore.db',
    });

    connectUserModel(sequelize);
  }
  async connect(): Promise<void> {
    await UserModel.sync({ alter: true });
  }
}

export default DBController;
