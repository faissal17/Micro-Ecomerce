import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userSeeder(amount: number = 5) {
  for (let i = 0; i < amount; i++) {
    await prisma.user.create({
      data: {
        name: faker.commerce.productName(),
        email: faker.internet.email(),
        role: faker.random.arrayElement(['Admin', 'User']),
      },
    });
  }
}
async function categorietSeeder(amount: number = 5) {
  for (let i = 0; i < amount; i++) {
    await prisma.categories.create({
      data: {
        name: faker.commerce.productName(),
      },
    });
  }
}
async function productSeeder(amount: number = 10) {
  for (let i = 0; i < amount; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: faker.datatype.number({ min: 100, max: 400 }),
        description: faker.commerce.productDescription(),
        categorieId: faker.datatype.number({ min: 0, max: 5 }),
      },
    });
  }
}
async function orderSeeder(amount: number = 5) {
  for (let i = 0; i < amount; i++) {
    await prisma.order.create({
      data: {
        name: faker.commerce.productName(),
        userId: faker.datatype.number({ min: 0, max: 5 }),
        productId: faker.datatype.number({ min: 0, max: 5 }),
      },
    });
  }
}
userSeeder();
categorietSeeder();
productSeeder();
orderSeeder();

