-- CreateTable
CREATE TABLE `XS_CANVAS` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `DATA` LONGBLOB NOT NULL,
    `OPTIONS` VARCHAR(191) NOT NULL,
    `CREATETIME` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DELETE` INTEGER NOT NULL DEFAULT 1,
    `STATE` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `XS_DATABASE` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(191) NOT NULL,
    `TYPE` INTEGER NOT NULL,
    `IPADDRESS` VARCHAR(191) NOT NULL,
    `PORT` INTEGER NOT NULL,
    `USERNAME` VARCHAR(191) NOT NULL,
    `PASSWORD` VARCHAR(191) NOT NULL,
    `SCHEMAS` VARCHAR(191) NOT NULL,
    `CREATETIME` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DELETE` INTEGER NOT NULL DEFAULT 1,
    `STATE` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;