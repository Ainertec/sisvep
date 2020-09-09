import { validate } from 'class-validator';
import { Like } from 'typeorm';
import { IRepository } from '../../repositories/IRepository';
import { Provider } from '../../entity/Provider';
import { ICreateProviderRequest, IUpdateProviderRequest } from './providerDTO';

export class ProviderUseCase {
  constructor(private repository: IRepository<Provider>) {}

  async createProvider(data: ICreateProviderRequest) {
    const provider = new Provider(data);

    const errors = await validate(provider);

    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    const createdProvider = await this.repository.save<Provider>(provider);

    return createdProvider;
  }

  async updateProvider(data: IUpdateProviderRequest) {
    const provider = await this.repository.findOne<Provider>({
      where: { id: data.id },
    });
    if (!provider) {
      throw new Error('Provider not found');
    }
    provider.name = data.name;
    provider.description = data.description;
    provider.email = data.email;
    provider.phone = data.phone;
    provider.identification = data.identification;

    await this.repository.save(provider);
    return provider;
  }

  async deleteProvider(id: number) {
    const provider = await this.repository.findOne<Provider>({
      where: { id },
      relations: ['products'],
    });
    if (!provider) {
      throw new Error('Provider not found');
    }
    if (provider.products.length > 0) {
      const hasProductInStock = provider.products.every(product => {
        return product.stock !== 0;
      });

      if (hasProductInStock) {
        throw new Error(`You have products in stock for ${provider.name} `);
      }
    }
  }

  async all() {
    const providers = await this.repository.find<Provider>({
      relations: ['products'],
    });
    return providers;
  }

  async allByName(name: string) {
    const providers = await this.repository.find<Provider>({
      where: { name: Like(`%${name}%`) },
      relations: ['products'],
    });
    return providers;
  }
}
