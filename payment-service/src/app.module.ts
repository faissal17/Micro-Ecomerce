import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
