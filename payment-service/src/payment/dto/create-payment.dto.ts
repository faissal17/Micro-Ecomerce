import { Order } from '../entities/order.entity';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  stripePaymentId?: string;
  paypalPaymentId?: string;
  amount: number;
  paymentDate: Date;
  paymentMethod?: PaymentMethod;
  currency?: string;
  order: Order;
}
