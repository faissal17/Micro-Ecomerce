import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentRepository.save(createPaymentDto);
  }

  findByOrderId(orderId: string) {
    return this.paymentRepository.findOne({ where: { order: { id: orderId } } });
  }  

  findAll() {
    return this.paymentRepository.find({ relations: ["order.customer"] });
  }
    
}
