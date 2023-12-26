import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseervice: DatabaseService) {}
  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseervice.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.databaseervice.product.findMany();
  }

  async findOne(id: number) {
    return this.databaseervice.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseervice.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseervice.product.delete({
      where: {
        id,
      },
    });
  }
}
