/*
  Warnings:

  - You are about to drop the `XsCanvas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `XsDatabase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `XsCanvas`;

-- DropTable
DROP TABLE `XsDatabase`;

-- CreateTable
CREATE TABLE `Canvas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `options` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete` INTEGER NOT NULL DEFAULT 1,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Database` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `ipaddress` VARCHAR(191) NOT NULL,
    `port` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `schemas` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete` INTEGER NOT NULL DEFAULT 1,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
