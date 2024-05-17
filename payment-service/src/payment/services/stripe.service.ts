import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { stripeConfig } from '../../config/stripe.config';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(stripeConfig.apiKey, {
      apiVersion: stripeConfig.apiVersion,
    });
  }

  async createStripePaymentMethod(token: any) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: token,
        },
      });

      return paymentMethod;
    } catch (error) {
      console.error('Error creating PaymentMethod:', error.message);
      throw error;
    }
  }

  async createPaymentIntent(amount: number, paymentMethodId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount,
        currency: 'MAD',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: 'http://localhost:5000/success',
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating PaymentIntent:', error.message);
      throw error;
    }
  }
}
