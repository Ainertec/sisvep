import { getRepository, FindOneOptions } from 'typeorm';
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

  async save<T>(arg: T): Promise<void> {
    await getRepository<T>(this.entity).save(arg);
  }

  async update<T>(arg: T): Promise<void> {
    await getRepository<T>(this.entity).save(arg);
  }

  async delete(id: number): Promise<void> {
    await getRepository<T>(this.entity).delete(id);
  }
}
