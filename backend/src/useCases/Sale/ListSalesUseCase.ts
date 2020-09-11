import { Sale } from '../../entity/Sale';
import { IRepository } from '../../repositories/IRepository';

export class ListSalesUseCase {
  constructor(private repository: IRepository<Sale>) {}

  async allSales() {
    const sales = await this.repository.find({ relations: ['itemsSale'] });

    return sales;
  }

  async salesById(id: number) {
    const sale = await this.repository.findOne({
      relations: ['itemsSale'],
      where: { id },
    });

    return sale;
  }
}
