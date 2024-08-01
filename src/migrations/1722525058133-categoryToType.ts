import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722525058133 implements MigrationInterface {

    name = "Migrations1722525058133";

    // 변경할 사항
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`',
        )
    }

    // 롤백할 사항
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`',
        )
    }

}
