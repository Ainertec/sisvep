import { getRepository } from 'typeorm';
import { Sale } from '../../entity/Sale';
import { IRepository } from '../../repositories/IRepository';

export class ReportUseCase {
  constructor(private repository: IRepository<Sale>) {}

  async allProductsSold() {
    const sales = await getRepository(Sale)
      .createQueryBuilder()
      .select('SUM(itemsSale.quantity)', 'soldout')
      .leftJoinAndSelect('sale.itemsSale', 'items_sale')
      .groupBy('itemsSale.product.name');
    return sales;
  }
}
