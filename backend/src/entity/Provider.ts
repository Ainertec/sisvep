import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Product } from './Product';

@Entity()
export class Provider {
  constructor(
    props: {
      name: string;
      description?: string;
      phone: string;
      email: string;
      identification: string;
      products?: number[];
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
  phone: string;

  @Column({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  identification: string;

  @OneToMany(type => Product, product => product.provider, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
