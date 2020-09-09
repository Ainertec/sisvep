import { FindOneOptions } from 'typeorm';

export interface IRepository<T> {
  find<T>(query?: FindOneOptions<T>): Promise<T[]>;
  findOne<T>(query?: FindOneOptions<T>): Promise<T>;
  save<T>(arg: T): Promise<T>;
  update<T>(arg: T): Promise<T>;
  delete(id: number): Promise<void>;
}
