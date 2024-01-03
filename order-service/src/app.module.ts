import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  controllers: [AppController],
  providers: [AppService,],
  imports: [OrdersModule],
})
export class AppModule {}
