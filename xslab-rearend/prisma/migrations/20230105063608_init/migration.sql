/*
  Warnings:

  - You are about to drop the column `type` on the `xs_img` table. All the data in the column will be lost.
  - Added the required column `bigType` to the `xs_img` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smallType` to the `xs_img` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `xs_img` DROP COLUMN `type`,
    ADD COLUMN `bigType` VARCHAR(191) NOT NULL,
    ADD COLUMN `smallType` VARCHAR(191) NOT NULL;
