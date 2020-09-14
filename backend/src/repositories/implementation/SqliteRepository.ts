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
}
