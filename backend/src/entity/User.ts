/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Sale } from './Sale';

export const Questions = Object.freeze({
  primeira: 'Qual o modelo do seu primeiro carro?',
  segunda: 'Qual o nome do seu melhor amigo de infância?',
  terceira: 'Qual o nome do seu primeiro animal de estimação?',
  quarta: 'Qual o nome da sua mãe?',
  quinta: 'Qual sua cor preferida?',
  getQuestions() {
    const ques = [
      this.primeira,
      this.segunda,
      this.terceira,
      this.quarta,
      this.quinta,
    ];
    return ques;
  },
});

@Entity()
export class User {
  constructor(
    props: {
      name: string;
      password: string;
      question: string;
      response: string;
      admin?: boolean;
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
  password_hash: string;

  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column()
  question: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  response: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Sale, sale => sale.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sales: Sale[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 8);
      console.log(this.password);
      this.password_hash = hash;
      this.password = null;
    }
  }

  public async checkPassword(password: string) {
    return bcrypt.compare(password, this.password_hash);
  }

  public generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }
}
