import { isBefore, isValid, parseISO } from 'date-fns';
import { getRepository } from 'typeorm';
import { ItemsSale } from '../../entity/ItemsSale';
import { Product } from '../../entity/Product';
import { Sale } from '../../entity/Sale';
import { IRepository } from '../../repositories/IRepository';

export class ReportUseCase {
  constructor(private repository: IRepository<Sale>) {}

  async allProductsSold() {
    const sales = await this.repository.getAllProductsSold();
    return sales;
  }

  async productsLucreAndTotalByMonth(initialDate: string, finalDate: string) {
    const initial = parseISO(initialDate);
    const final = parseISO(finalDate);

    if (!isValid(initial) || !isValid(final)) throw new Error('invalid date');

    if (!isBefore(initial, final)) throw new Error('Invalid interval');

    const sales = await this.repository.getProductsLucreAndTotalByMonth(
      initial,
      final,
    );
    return sales;
  }

  async productsTotalPercent() {
    const sales = await this.repository.getProductsTotalPercent();

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
    const sales = await this.repository.getProductsTotalPercent();

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
    const productsProviders = await this.repository.getProvidersProductsCount();
    return productsProviders;
  }

  async salesTotal() {
    const sales = await this.repository.find<Sale>({});

    const total = sales.reduce((sum, sale) => {
      return sum + sale.total;
    }, 0);

    return { total: total.toFixed(2) };
  }
}
