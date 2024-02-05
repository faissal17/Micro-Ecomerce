import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { StripeService } from './services/stripe.service';
import { OrderService } from './services/order.service';
import { PaymentMethod } from './entities/payment.entity';
import { Order, OrderStatus } from './entities/order.entity';
import { PaypalService } from './services/paypal.service';
import { ConflictException } from '@nestjs/common';

@Controller('api/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly stripeService: StripeService,
    private readonly paypalService: PaypalService,
  ) {}

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Post('create-stripe-payment')
  async createStripePayment(@Req() req, @Res() res) {
    try {
      const { token, orderId } = req.body;

      const isOrderPayed = await this.paymentService.findByOrderId(orderId);

      if(isOrderPayed){
        throw new ConflictException("Order Already Payed !");
      }

      const order = await this.orderService.findOne(orderId);

      let orderTotalPrice = 0;
      if (order && order.orderProducts.length !== 0) {
        for (const orderProduct of order.orderProducts) {
          orderTotalPrice += orderProduct.quantity * orderProduct.product.price;
        }
      }

      orderTotalPrice = Math.round(orderTotalPrice);

      const { id } = await this.stripeService.createStripePaymentMethod(token);

      const payment = await this.stripeService.createPaymentIntent(
        orderTotalPrice * 100,
        id,
      );

      if (payment.status === 'succeeded') {
        const paymentObj = {
          stripePaymentId: payment.id,
          amount: orderTotalPrice,
          paymentDate: new Date(),
          paymentMethod: PaymentMethod.CARD,
          currency: 'MAD',
          order: orderId,
        };

        if (await this.paymentService.create(paymentObj)) {
          await this.orderService.update(orderId, {status: OrderStatus.PAYED});
        }

        res.status(200).json({...paymentObj, ...order})
      
      }

    } catch (error) {
      res.status(400).json({
        error: error || "An error occurred",
      });
    }
  }

  @Post('create-paypal-payment')
  async createPaypalPayment(@Req() req, @Res() res) {
    try {
      const { orderId } = req.body;

      const isOrderPayed = await this.paymentService.findByOrderId(orderId);

      if(isOrderPayed){
        throw new ConflictException("Order Already Payed !");
      }

      const order = await this.orderService.findOne(orderId);

      let orderTotalPrice = 0;

      if (order && order.orderProducts.length !== 0) {
        for (const orderProduct of order.orderProducts) {
          orderTotalPrice += orderProduct.quantity * orderProduct.product.price;
        }
      }

      orderTotalPrice = Math.round(orderTotalPrice);

      const payment = await this.paypalService.createPayment(
        orderTotalPrice,
        orderId,
      );
      
      return res.status(200).send(JSON.parse(payment).links.find(link => link.rel === "approval_url").href);

    } catch (error) {
      res.status(400).json({
        error: error || "An error occurred",
      });
    }
  }

  @Post('paypal-success')
  async validPaypalPayment(
    @Req() req,
    @Res() res
  ) {
    const {paymentId, orderId, PayerID, amount} = req.body;

    const isOrderPayed = await this.paymentService.findByOrderId(orderId);

    if(isOrderPayed){
      throw new ConflictException("Order Already Payed !");
    }

    try {
      const payment = await this.paypalService.executePayment(
        paymentId,
        PayerID,
        +amount,
      );

      const paymentObj = {
        paypalPaymentId: paymentId,
        amount: +amount,
        paymentDate: new Date(),
        paymentMethod: PaymentMethod.PAYPAL,
        currency: 'USD',
        order: orderId,
      };

      if (await this.paymentService.create(paymentObj)) {
        await this.orderService.update(orderId, { status: OrderStatus.PAYED });
      }

      res.status(201).json(paymentObj);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
