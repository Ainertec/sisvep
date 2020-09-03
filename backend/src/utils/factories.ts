/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import factory from 'factory-girl';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

factory.define('User', User, {
  name: faker.name.findName(),
  password: faker.internet.password(),
  question: 'Qual o modelo do seu primeiro carro?',
  response: faker.lorem.words(3),
  admin: true,
});

export async function getFactory<T>(
  name: string,
  attrs?: factory.Definition<T>,
) {
  const entity = await factory.build<T>(name, attrs);

  const newEntity = await getRepository(name).save(entity);
  return newEntity;
}
