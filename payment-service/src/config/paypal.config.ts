require('dotenv').config();

const { paypalClientID, paypalSecretKey } = process.env;

export const paypalConfig = {
  clientID: paypalClientID,
  secretKey: paypalSecretKey,
};
