/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { ItemsSale } from './ItemsSale';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Sale {
  constructor(
    props: {
      total: number;
      payment: string;
      user: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  total: number;

  @Column({ nullable: false, default: null })
  payment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => ItemsSale, itemsSale => itemsSale.sale, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  itemsSale: ItemsSale[];

  @ManyToOne(type => User, user => user.sales, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
