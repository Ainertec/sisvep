import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1599130884060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          // {
          //   name: 'password',
          //   type: null,
          //   isNullable: true,
          // },
          {
            name: 'password_hash',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'question',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'response',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin',
            type: 'boolean',
            // isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
