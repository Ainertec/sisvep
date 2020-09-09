import { MigrationInterface, QueryRunner } from 'typeorm';

export class teste1599670643105 implements MigrationInterface {
  name = 'teste1599670643105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "provider" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "identification" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "providerId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "password_hash" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "question" varchar NOT NULL, "response" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "providerId" integer, CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "providerId") SELECT "id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "providerId" FROM "product"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "providerId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "providerId") SELECT "id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "providerId" FROM "temporary_product"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "provider"`);
  }
}
