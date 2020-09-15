import { isBefore, isValid, parseISO } from 'date-fns';
import { getRepository } from 'typeorm';
import { ItemsSale } from '../../entity/ItemsSale';
import { Product } from '../../entity/Product';
import { Provider } from '../../entity/Provider';
import { Sale } from '../../entity/Sale';
import { IRepository } from '../../repositories/IRepository';

export class ReportUseCase {
  constructor(private repository: IRepository<Sale>) {}

  async allProductsSold() {
    const sales = await getRepository(ItemsSale)
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();
    return sales;
  }

  async productsLucreAndTotalByMonth(initialDate: string, finalDate: string) {
    const initial = parseISO(initialDate);
    const final = parseISO(finalDate);

    if (!isValid(initial) || !isValid(final)) throw new Error('invalid date');

    if (!isBefore(initial, final)) throw new Error('Invalid interval');

    const sales = getRepository(Sale)
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

  async productsTotalPercent() {
    const sales = await getRepository(ItemsSale)
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();

    const totalProducts = sales.reduce((sum, product) => {
      return sum + product.soldout;
    }, 0);

    const productsPecent = sales.map(product => {
      const newProduct = product;
      newProduct.soldout = ((product.soldout / totalProducts) * 100).toFixed(2);
      return newProduct;
    });
    return productsPecent;
  }

  async productsAmountPercent() {
    const sales = await getRepository(ItemsSale)
      .createQueryBuilder('items_sale')
      .select('SUM(items_sale.quantity*products.price)', 'soldout')
      .leftJoinAndSelect('items_sale.product', 'products')
      .groupBy('products.id')
      .orderBy('soldout', 'DESC')
      .getRawMany();

    const totalProducts = sales.reduce((sum, product) => {
      return sum + product.soldout;
    }, 0);

    const productsPecent = sales.map(product => {
      const newProduct = product;
      newProduct.soldout = ((product.soldout / totalProducts) * 100).toFixed(2);
      return newProduct;
    });
    return productsPecent;
  }

  async providersProducts() {
    const productsProviders = getRepository(Product)
      .createQueryBuilder('product')
      .select('Sum(provider.id)', 'total')
      .leftJoinAndSelect('product.provider_id', 'provider')
      .groupBy('provider.id')
      .orderBy('total', 'DESC')
      .getRawMany();
    return productsProviders;
  }
}
