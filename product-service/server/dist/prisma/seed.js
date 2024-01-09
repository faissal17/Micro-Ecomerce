"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function ProductSeeder(amount = 10) {
    for (let i = 0; i < amount; i++) {
        await prisma.product.create({
            data: {
                name: faker_1.faker.commerce.productName(),
                price: faker_1.faker.number.float({ min: 100, max: 400 }),
                description: faker_1.faker.commerce.productDescription(),
                categorieId: 1
            },
        });
    }
}
ProductSeeder();
//# sourceMappingURL=seed.js.map