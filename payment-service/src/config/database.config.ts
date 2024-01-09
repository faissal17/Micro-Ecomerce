import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customer } from 'src/payment/entities/customer.entity';
import { OrderProduct } from 'src/payment/entities/order-product.entity';
import { Order } from 'src/payment/entities/order.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/payment/entities/product.entity';
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: PGHOST,
  port: 5432,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  entities: [Payment, Order, Customer, Product, OrderProduct],
  synchronize: true,
  extra: {
    ssl: true,
  },
};

export default databaseConfig;
