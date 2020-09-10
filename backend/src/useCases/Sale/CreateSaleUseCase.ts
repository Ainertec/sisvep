/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { validate } from 'class-validator';
import { IRepository } from '../../repositories/IRepository';
import { Sale } from '../../entity/Sale';
import { ICreateSaleRequest } from './sale.DTO';
import { ItemsSale } from '../../entity/ItemsSale';

export class CreateSaleUseCase {
  constructor(private repository: IRepository<Sale>) {}

  async createSale(data: ICreateSaleRequest) {
    const queryRunner = this.repository.queryRunner();
    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      const alerts: string[] = [];
      const sale = new Sale({
        total: data.total,
        payment: data.payment,
        user: data.user,
      });
      const errors = await validate(sale);
      if (errors.length > 0) {
        throw new Error(String(errors));
      }

      const createdSale = await queryRunner.manager.save(sale);

      const items = data.items.map(item => {
        const itemsSale = new ItemsSale({
          product: item.product,
          sale: createdSale.id,
          quantity: item.quantity,
        });
        return itemsSale;
      });

      await queryRunner.manager.save(items);

      const saleWithItem = await queryRunner.manager.findOne<Sale>('Sale', {
        where: { id: createdSale.id },
        relations: ['itemsSale'],
      });

      saleWithItem.itemsSale.forEach(item => {
        if (item.product.stock <= 5) {
          alerts.push(item.product.name);
        }
      });
      await queryRunner.commitTransaction();

      return {
        sale: saleWithItem,
        alerts: alerts.length === 0 ? undefined : alerts,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }
}
