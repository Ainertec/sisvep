import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSale1599739152013 implements MigrationInterface {
  name = 'addSale1599739152013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "provider" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "identification" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "provider_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "total" integer NOT NULL, "payment" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "items_sales" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "product_id" integer, "sale_id" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "password_hash" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "question" varchar NOT NULL, "response" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "provider_id" integer, CONSTRAINT "FK_21370c1fdc836875d42b50851de" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "provider_id") SELECT "id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "provider_id" FROM "product"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_items_sales" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "product_id" integer, "sale_id" integer, CONSTRAINT "FK_f9de0ab10dce0df152b7311c89a" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_71000944ea191d30c54ce86c728" FOREIGN KEY ("sale_id") REFERENCES "sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_items_sales"("id", "quantity", "product_id", "sale_id") SELECT "id", "quantity", "product_id", "sale_id" FROM "items_sales"`,
    );
    await queryRunner.query(`DROP TABLE "items_sales"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_items_sales" RENAME TO "items_sales"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items_sales" RENAME TO "temporary_items_sales"`,
    );
    await queryRunner.query(
      `CREATE TABLE "items_sales" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "product_id" integer, "sale_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "items_sales"("id", "quantity", "product_id", "sale_id") SELECT "id", "quantity", "product_id", "sale_id" FROM "temporary_items_sales"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_items_sales"`);
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "cost" integer NOT NULL, "barcode" integer NOT NULL, "stock" integer NOT NULL, "validity" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "provider_id" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "provider_id") SELECT "id", "name", "description", "price", "cost", "barcode", "stock", "validity", "createdAt", "updatedAt", "provider_id" FROM "temporary_product"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "items_sales"`);
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "provider"`);
  }
}
