import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: 'ep-morning-bush-a5qbmn17-pooler.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'willsayko296',
      password: '7TPpEN0VodMg',
      database: 'order-service',
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  }
  
  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
    }
  }
}
