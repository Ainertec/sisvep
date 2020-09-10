/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './Product';
import { Sale } from './Sale';

@Entity({ name: 'items_sales' })
export class ItemsSale {
  constructor(
    props: {
      product: number;
      sale: number;
      quantity: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  public quantity!: number;

  @ManyToOne(type => Product, product => product.itemsSale, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(type => Sale, sale => sale.itemsSale, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
