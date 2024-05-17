import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';
import { paypalConfig } from 'src/config/paypal.config';

@Injectable()
export class PaypalService {
  constructor() {
    paypal.configure({
      mode: 'sandbox',
      client_id: paypalConfig.clientID,
      client_secret: paypalConfig.secretKey,
    });
  }

  async createPayment(amount: number, order_id: string): Promise<string> {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: amount.toFixed(2),
          },
        },
      ],
      redirect_urls: {
        return_url: `http://localhost:3000/payment/success?amount=${amount}&orderId=${order_id}`,
        cancel_url: `http://localhost:3000/payment/${order_id}`,
      },
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.stringify(payment));
        }
      });
    });
  }

  async executePayment(paymentId: string, payerId: string, amount: number) {
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: amount,
          },
        },
      ],
    };

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prettier/prettier
      paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        },
      );
    });
  }
}
