import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: any): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'orderProducts.product'],
    });
  }

  async update(id: any, updatedOrder: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, updatedOrder);
    return this.orderRepository.findOne(id);
  }
}
