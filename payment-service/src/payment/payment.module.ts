import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './payment.controller';
import { StripeService } from './services/stripe.service';
import { OrderService } from './services/order.service';
import { Payment } from './entities/payment.entity';
import { PaypalService } from './services/paypal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Payment])],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService, StripeService, PaypalService],
})
export class PaymentModule {}
