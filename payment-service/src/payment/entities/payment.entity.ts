import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  stripePaymentId: string;

  @Column({ nullable: true })
  paypalPaymentId: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  currency: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
