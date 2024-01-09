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

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly stripeService: StripeService,
    private readonly paypalService: PaypalService,
  ) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @Post('create-stripe-payment')
  async createStripePayment(@Req() req, @Res() res) {
    try {
      const { token, orderId } = req.body;

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
          await this.orderService.update(orderId, {
            status: OrderStatus.PAYED,
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error,
      });
    }
  }

  @Post('create-paypal-payment')
  async createPaypalPayment(@Req() req, @Res() res) {
    try {
      const { orderId } = req.body;

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
      return res.send(payment);
    } catch (error) {
      res.send(error);
      // return res.status(500).json({ error: 'Failed to create payment', message: error.message });
    }
  }

  @Get('paypal-success')
  async validPaypalPayment(
    @Query('paymentId') paymentId: string,
    @Query('orderId') orderId: Order,
    @Query('amount') amount: string,
    @Query('PayerID') payerId: string,
    @Res() res,
  ) {
    try {
      const payment = await this.paypalService.executePayment(
        paymentId,
        payerId,
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

      res.send(paymentObj);
    } catch (error) {
      res.send(error);
    }
  }
}
