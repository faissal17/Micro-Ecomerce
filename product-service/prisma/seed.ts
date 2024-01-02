import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function ProductSeeder(amount = 10) {
  for (let i = 0; i < amount; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: 200,
        description: faker.commerce.productDescription(),
        categorieId: 1,
      },
    });
  }
  console.log(ProductSeeder);
}
ProductSeeder();
