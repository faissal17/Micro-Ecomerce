import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_products')
export class OrderProduct {
  @PrimaryColumn()
  orderId: string;

  @PrimaryColumn()
  productId: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
