import { validate } from 'class-validator';
import { Shop } from '../../entity/Shop';
import { IRepository } from '../../repositories/IRepository';
import { ICreateShopRequest, IUpdateShopRequest } from './shopDTO';

export class ShopUseCase {
  constructor(private repository: IRepository<Shop>) {}

  async creatShop(data: ICreateShopRequest) {
    const count = await this.repository.count();

    if (count !== 0) {
      throw new Error('Already exist a shop');
    }
    const shop = new Shop(data);
    const errors = await validate(shop);
    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    const createdShop = await this.repository.save(shop);

    return createdShop;
  }

  async updateShop(data: IUpdateShopRequest) {
    const shop = await this.repository.findOne<Shop>({
      where: { id: data.id },
    });
    if (!shop) {
      throw new Error('The shop does not exist');
    }
    shop.name = data.name;
    shop.identification = data.identification;
    shop.email = data.email;
    shop.address = data.address;
    if (data.phone) {
      shop.phone = data.phone;
    }
    const errors = await validate(shop);
    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    const updateShop = await this.repository.save(shop);

    return updateShop;
  }

  async all() {
    const shop = await this.repository.findOne({});
    return shop;
  }
}
