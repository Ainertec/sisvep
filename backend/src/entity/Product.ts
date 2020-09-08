/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Provider } from './Provider';

@Entity()
export class Product {
  constructor(
    props: {
      name: string;
      description?: string;
      price: number;
      cost: number;
      barcode: number;
      validity: Date;
      stock: number;
      provider: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  price: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  cost: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  barcode: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  stock: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  validity: Date;

  @ManyToOne(type => Provider, provider => provider.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  provider: Provider;
}
