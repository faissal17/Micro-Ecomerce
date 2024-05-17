require('dotenv').config();

const { stripeApiKey } = process.env;

export const stripeConfig = {
  apiKey: stripeApiKey,
  apiVersion: '2023-10-16' as const,
};
