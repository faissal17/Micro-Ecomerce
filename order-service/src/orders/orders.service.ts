import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseservice: DatabaseService) {}
  async create(createOrderDto: Prisma.OrderCreateInput) {
    return this.databaseservice.order.create({
      data: createOrderDto,
    });
  }

  async findAll() {
    return this.databaseservice.order.findMany();
  }

  async findOne(id: number) {
    return this.databaseservice.order.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateOrderDto: Prisma.OrderUpdateInput) {
    return this.databaseservice.order.update({
      where: {
        id,
      },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return this.databaseservice.order.delete({
      where: {
        id,
      },
    });
  }
}
