/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import factory from 'factory-girl';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Product } from '../entity/Product';
import { Provider } from '../entity/Provider';

factory.define('User', User, {
  name: faker.name.findName(),
  password: faker.internet.password(),
  question: 'Qual o modelo do seu primeiro carro?',
  response: faker.lorem.words(3),
  admin: true,
});

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  barcode: faker.random.number(100),
  validity: faker.date.future(),
  stock: faker.random.number(20),
});

factory.define('Provider', Provider, {
  name: faker.name.findName(),
  description: faker.commerce.productAdjective(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  identification: faker.name.title(),
});

export async function getFactory<T>(
  name: string,
  attrs?: factory.Definition<Partial<T>>,
) {
  const entity = await factory.build<T>(name, attrs);

  const newEntity = await getRepository(name).save(entity);
  return newEntity;
}
