import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userSeeder(amount: number = 5) {
  for (let i = 0; i < amount; i++) {
    await prisma.user.create({
      data: {
        name: faker.commerce.productName(),
        email: faker.internet.email(),
        role: 'User',
      },
    });
  }
}

async function ProductSeeder(amount: number = 10) {
  for (let i = 0; i < amount; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 100, max: 400 }),
        description: faker.commerce.productDescription(),
        categorieId: 1,
      },
    });
  }
}

userSeeder();
ProductSeeder();
