/* eslint-disable no-multi-assign */
import { getConnection, createConnection, getConnectionOptions } from 'typeorm';

const connection = {
  async create() {
    // const connectionName = process.env.NODE_ENV ? 'test' : '';
    // const connectionOptions = await getConnectionOptions('test');
    // console.log(connectionOptions);
    await createConnection({
      type: 'sqlite',
      database: 'src/database/test.sqlite',
      synchronize: true,
      logging: false,
      migrationsRun: true,
      dropSchema: true,
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/database/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/database/migration',
        subscribersDir: 'src/subscriber',
      },
    });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connectionClear = getConnection();
    const entities = connectionClear.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connectionClear.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
