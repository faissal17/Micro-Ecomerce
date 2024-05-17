import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('double precision')
  price: number;

  // @ManyToMany(() => Order, (order) => order.products, { cascade: true })
  // @JoinTable({
  //   name: 'order_products',
  //   joinColumn: { name: 'productId', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'orderId', referencedColumnName: 'id' },
  // })
  // orders: Order[];
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
