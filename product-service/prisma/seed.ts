import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function ProductSeeder(amount: number = 10) {
  for (let i = 0; i < amount; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 100, max: 400 }),
        description: faker.commerce.productDescription(),
        categorieId:1
      },
    });
  }
}
ProductSeeder();
