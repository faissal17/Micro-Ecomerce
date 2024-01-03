import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [AppController],
  providers: [AppService,],
  imports: [OrdersModule, DatabaseModule],
})
export class AppModule {}
