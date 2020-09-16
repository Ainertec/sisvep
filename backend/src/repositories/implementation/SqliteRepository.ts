import {
  getRepository,
  FindOneOptions,
  getConnection,
  QueryRunner,
} from 'typeorm';
import { IRepository } from '../IRepository';

export class SqliteRepository<T> implements IRepository<T> {
  constructor(private entity: string) {}

  async findOne<T>(query?: FindOneOptions<T>): Promise<T> {
    const users = query
      ? await getRepository<T>(this.entity).findOne(query)
      : getRepository<T>(this.entity).findOne({});
    return users;
  }

  async find<T>(query: FindOneOptions<T>): Promise<T[]> {
    const users = query
      ? await getRepository<T>(this.entity).find(query)
      : getRepository<T>(this.entity).find({});
    return users;
  }

  async save<T>(arg: T): Promise<T> {
    const response = await getRepository<T>(this.entity).save(arg);
    return response;
  }

  async update<T>(arg: T): Promise<T> {
    const updated = await getRepository<T>(this.entity).save(arg);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await getRepository<T>(this.entity).delete(id);
  }

  async deleteByCreatedAt(date: string): Promise<void> {
    await getRepository<T>(this.entity)
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where('createdAt < :date', { date })
      .execute();
  }

  queryRunner(): QueryRunner {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    return queryRunner;
  }

  async count(): Promise<number> {
    const count = await getRepository(this.entity).count();
    return count;
  }

  async getAllProductsSold() {
    const sales = await getRepository('ItemsSale')
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();
    return sales;
  }

  async getProductsLucreAndTotalByMonth(initial: Date, final: Date) {
    const sales = await getRepository(this.entity)
      .createQueryBuilder('sale')
      .select('SUM(sale.total)', 'amount')
      .addSelect('strftime("%m-%Y", sale.createdAt)', 'month_and_year')
      .addSelect('SUM(1)', 'total_sales')
      .where('sale.createdAt BETWEEN :initial and :final', {
        initial: initial.toISOString().split('T')[0],
        final: final.toISOString().split('T')[0],
      })
      .groupBy('strftime("%m-%Y", sale.createdAt)')
      .orderBy('amount', 'DESC')
      .getRawMany();

    return sales;
  }

  async getProductsTotalPercent() {
    const sales = await getRepository('ItemsSale')
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();

    return sales;
  }

  async getProductsAmountPercent() {
    const sales = await getRepository('ItemsSale')
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity*products.price)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();

    return sales;
  }

  async getProvidersProductsCount() {
    const productsProviders = await getRepository('Product')
      .createQueryBuilder('product')
      .select('Sum(1)', 'total_products')
      .leftJoinAndSelect('product.provider', 'provider')
      .groupBy('provider.id')
      .orderBy('total_products', 'DESC')
      .getRawMany();
    return productsProviders;
  }
}
