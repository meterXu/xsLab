-- CreateTable
CREATE TABLE `xs_canvas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `options` TEXT NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete` INTEGER NOT NULL DEFAULT 1,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `xs_database` (
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

-- CreateTable
CREATE TABLE `xs_img` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `bigType` VARCHAR(191) NOT NULL,
    `smallType` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete` INTEGER NOT NULL DEFAULT 1,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Data
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('long_1.png', '/material/bg/long_1.png', '8100x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'long');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_15.png', '/material/bg/normal_15.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_1.png', '/material/bg/normal_1.png', '3840x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('long_3.png', '/material/bg/long_3.png', '3240x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'long');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_10.png', '/material/bg/normal_10.png', '3840x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_3.png', '/material/bg/normal_3.png', '8000x4500', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_2.png', '/material/bg/normal_2.png', '1600x900', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_17.png', '/material/bg/normal_17.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_11.png', '/material/bg/normal_11.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('long_2.png', '/material/bg/long_2.png', '6300x2100', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'long');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_14.png', '/material/bg/normal_14.png', '1439x809', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_19.png', '/material/bg/normal_19.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('long_4.png', '/material/bg/long_4.png', '8100x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'long');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_16.png', '/material/bg/normal_16.png', '1920x1081', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_18.png', '/material/bg/normal_18.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_12.png', '/material/bg/normal_12.png', '3840x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_13.png', '/material/bg/normal_13.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_4.png', '/material/bg/normal_4.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_6.png', '/material/bg/normal_6.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1-frame-[37].png', '/material/container-body/1-frame-[37].png', '862x401', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1.png', '/material/container-body/1.png', '131x144', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('10-边框-左二.png', '/material/container-body/10-边框-左二.png', '588x333', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_9.png', '/material/bg/normal_9.png', '3840x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_5.png', '/material/bg/normal_5.png', '1920x1080', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('10模块边框7.png', '/material/container-body/10模块边框7.png', '541x748', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_8.png', '/material/bg/normal_8.png', '960x540', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('11模块边框8.png', '/material/container-body/11模块边框8.png', '540x748', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('10地图背景装饰.png', '/material/container-body/10地图背景装饰.png', '1887x965', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('11.png', '/material/container-body/11.png', '937x310', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('normal_7.png', '/material/bg/normal_7.png', '3840x2160', '2023-01-05 07:02:22.445', 1, 1, 'bg', 'normal');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('11托盘装饰.png', '/material/container-body/11托盘装饰.png', '2274x779', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('10.png', '/material/container-body/10.png', '290x397', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('12模块边框9.png', '/material/container-body/12模块边框9.png', '541x748', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('12.png', '/material/container-body/12.png', '451x633', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('13.png', '/material/container-body/13.png', '182x187', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('13模块边框10.png', '/material/container-body/13模块边框10.png', '664x748', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('14.png', '/material/container-body/14.png', '493x346', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('18-框1.png', '/material/container-body/18-框1.png', '244x182', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('15.png', '/material/container-body/15.png', '884x64', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1模块标题_模块边框.png', '/material/container-body/1模块标题_模块边框.png', '2684x2042', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('17.png', '/material/container-body/17.png', '493x650', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2.png', '/material/container-body/2.png', '883x685', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('18-框2.png', '/material/container-body/18-框2.png', '244x182', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('22.png', '/material/container-body/22.png', '477x497', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('16.png', '/material/container-body/16.png', '493x689', '2023-01-05 07:02:22.445', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('21.png', '/material/container-body/21.png', '958x425', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('18-框3.png', '/material/container-body/18-框3.png', '244x182', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('23.png', '/material/container-body/23.png', '297x84', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2-frame-[37]备份.png', '/material/container-body/2-frame-[37]备份.png', '862x841', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('20.png', '/material/container-body/20.png', '877x317', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('25.png', '/material/container-body/25.png', '477x304', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('24.png', '/material/container-body/24.png', '216x127', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('26.png', '/material/container-body/26.png', '324x411', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('28.png', '/material/container-body/28.png', '940x936', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2组件框1.png', '/material/container-body/2组件框1.png', '810x226', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('29.png', '/material/container-body/29.png', '280x171', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('35.png', '/material/container-body/35.png', '546x413', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('30.png', '/material/container-body/30.png', '909x452', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2模块边框2.png', '/material/container-body/2模块边框2.png', '2506x1976', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3-左一.png', '/material/container-body/3-左一.png', '895x289', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('27.png', '/material/container-body/27.png', '324x447', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2模块边框1@2x.png', '/material/container-body/2模块边框1@2x.png', '1406x310', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3-框-右一.png', '/material/container-body/3-框-右一.png', '1464x876', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('31.png', '/material/container-body/31.png', '831x940', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3-frame-[33].png', '/material/container-body/3-frame-[33].png', '1783x726', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3.png', '/material/container-body/3.png', '475x145', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3-框.png', '/material/container-body/3-框.png', '542x282', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('33.png', '/material/container-body/33.png', '546x587', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('32.png', '/material/container-body/32.png', '546x461', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('34.png', '/material/container-body/34.png', '546x539', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('37.png', '/material/container-body/37.png', '226x161', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('38.png', '/material/container-body/38.png', '434x152', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3组件框1.png', '/material/container-body/3组件框1.png', '876x571', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3模块边框2@2x.png', '/material/container-body/3模块边框2@2x.png', '1486x1820', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('36.png', '/material/container-body/36.png', '458x286', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3组件框2.png', '/material/container-body/3组件框2.png', '810x320', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3模块边框1@2x.png', '/material/container-body/3模块边框1@2x.png', '466x1016', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('39.png', '/material/container-body/39.png', '503x948', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4-左二.png', '/material/container-body/4-左二.png', '895x319', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3模块边框3.png', '/material/container-body/3模块边框3.png', '2512x1976', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4-框-右二.png', '/material/container-body/4-框-右二.png', '1455x789', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3组件框@2x.png', '/material/container-body/3组件框@2x.png', '1148x526', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4-边框-左一-上.png', '/material/container-body/4-边框-左一-上.png', '653x292', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4-组件框.png', '/material/container-body/4-组件框.png', '1762x841', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4.png', '/material/container-body/4.png', '475x381', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4-边框-左中.png', '/material/container-body/4-边框-左中.png', '447x270', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('41.png', '/material/container-body/41.png', '437x405', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('42.png', '/material/container-body/42.png', '322x192', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('40.png', '/material/container-body/40.png', '319x122', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('44.png', '/material/container-body/44.png', '437x261', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5-指标卡.png', '/material/container-body/5-指标卡.png', '345x98', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('43.png', '/material/container-body/43.png', '320x125', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4模块边框4.png', '/material/container-body/4模块边框4.png', '1372x806', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('45.png', '/material/container-body/45.png', '437x326', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('47.png', '/material/container-body/47.png', '178x97', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5-边框-左下.png', '/material/container-body/5-边框-左下.png', '449x328', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5-框-右三.png', '/material/container-body/5-框-右三.png', '1940x1272', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('49.png', '/material/container-body/49.png', '388x58', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4组件框2.png', '/material/container-body/4组件框2.png', '876x1123', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('46.png', '/material/container-body/46.png', '437x338', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4模块边框2@2x.png', '/material/container-body/4模块边框2@2x.png', '886x540', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('48.png', '/material/container-body/48.png', '445x260', '2023-01-05 07:02:22.446', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5-框.png', '/material/container-body/5-框.png', '727x282', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5-边框-左一-下.png', '/material/container-body/5-边框-左一-下.png', '640x480', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('51.png', '/material/container-body/51.png', '445x310', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('50.png', '/material/container-body/50.png', '262x130', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5.png', '/material/container-body/5.png', '475x679', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5指标卡边框1.png', '/material/container-body/5指标卡边框1.png', '524x394', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5模块边框5.png', '/material/container-body/5模块边框5.png', '1392x806', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5组件框3.png', '/material/container-body/5组件框3.png', '876x639', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6-边框-右上.png', '/material/container-body/6-边框-右上.png', '447x263', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6-边框-左二.png', '/material/container-body/6-边框-左二.png', '640x640', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6.png', '/material/container-body/6.png', '851x271', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('60.png', '/material/container-body/60.png', '505x215', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('66.png', '/material/container-body/66.png', '886x900', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('63.png', '/material/container-body/63.png', '437x40', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6指标卡边框2.png', '/material/container-body/6指标卡边框2.png', '522x399', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7-下左一.png', '/material/container-body/7-下左一.png', '437x316', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7-边框-中间.png', '/material/container-body/7-边框-中间.png', '1320x670', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6组件框.png', '/material/container-body/6组件框.png', '888x856', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7.png', '/material/container-body/7.png', '736x767', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('82.png', '/material/container-body/82.png', '467x310', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('80.png', '/material/container-body/80.png', '740x100', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('81.png', '/material/container-body/81.png', '530x310', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框1-高.png', '/material/container-body/不带标题边框1-高.png', '300x500', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('9模块边框6.png', '/material/container-body/9模块边框6.png', '540x748', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('83.png', '/material/container-body/83.png', '770x449', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('form.png', '/material/container-body/form.png', '475x243', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('9-边框-左一.png', '/material/container-body/9-边框-左一.png', '588x286', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('8.png', '/material/container-body/8.png', '327x203', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('Rectangle.png', '/material/container-body/Rectangle.png', '150x230', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('70.png', '/material/container-body/70.png', '802x222', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框2-常规比例.png', '/material/container-body/不带标题边框2-常规比例.png', '1000x600', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('8-边框-右侧.png', '/material/container-body/8-边框-右侧.png', '640x790', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框1-方.png', '/material/container-body/不带标题边框1-方.png', '400x400', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框1-常规比例.png', '/material/container-body/不带标题边框1-常规比例.png', '500x300', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('9.png', '/material/container-body/9.png', '440x1151', '2023-01-05 07:02:22.447', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框2-方.png', '/material/container-body/不带标题边框2-方.png', '800x800', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框3-宽.png', '/material/container-body/不带标题边框3-宽.png', '895x354', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('中间背景@2x.png', '/material/container-body/中间背景@2x.png', '1200x1465', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('业绩指标.png', '/material/container-body/业绩指标.png', '250x110', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框3-方.png', '/material/container-body/不带标题边框3-方.png', '428x354', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框2-高.png', '/material/container-body/不带标题边框2-高.png', '600x1000', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('中间边框.png', '/material/container-body/中间边框.png', '834x930', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('不带标题边框3-高.png', '/material/container-body/不带标题边框3-高.png', '438x726', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('业绩达成.png', '/material/container-body/业绩达成.png', '250x110', '2023-01-05 07:02:22.448', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('中间边框@2x.png', '/material/container-body/中间边框@2x.png', '1174x1420', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('半透明矩形.png', '/material/container-body/半透明矩形.png', '140x96', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('右上背景.png', '/material/container-body/右上背景.png', '2022x529', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('右下背景.png', '/material/container-body/右下背景.png', '2030x684', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('哐哐哐备份 2.png', '/material/container-body/哐哐哐备份 2.png', '553x350', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('右中背景.png', '/material/container-body/右中背景.png', '1641x606', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('各模块边框.png', '/material/container-body/各模块边框.png', '984x590', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('切一块背景.png', '/material/container-body/切一块背景.png', '5666x1865', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('四周装饰框@2x.png', '/material/container-body/四周装饰框@2x.png', '2861x1571', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('小边框@2x.png', '/material/container-body/小边框@2x.png', '810x449', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框1-常规比例.png', '/material/container-body/带标题边框1-常规比例.png', '840x620', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框1-宽.png', '/material/container-body/带标题边框1-宽.png', '1960x1020', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('地图框.png', '/material/container-body/地图框.png', '804x440', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框1-高.png', '/material/container-body/带标题边框1-高.png', '840x1020', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框2-宽.png', '/material/container-body/带标题边框2-宽.png', '2064x1172', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('地图背景.png', '/material/container-body/地图背景.png', '1550x840', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('图表背景.png', '/material/container-body/图表背景.png', '984x472', '2023-01-05 07:02:22.449', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('指标卡1.png', '/material/container-body/指标卡1.png', '212x142', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框2-高.png', '/material/container-body/带标题边框2-高.png', '928x1172', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('数字框.png', '/material/container-body/数字框.png', '120x152', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('指标卡.png', '/material/container-body/指标卡.png', '197x142', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('收入.png', '/material/container-body/收入.png', '311x90', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('带标题边框2-常规比例.png', '/material/container-body/带标题边框2-常规比例.png', '880x640', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('矩形备份 17.png', '/material/container-body/矩形备份 17.png', '742x213', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('矩形.png', '/material/container-body/矩形.png', '454x50', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-下1.png', '/material/container-body/组件框-下1.png', '890x347', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-下.png', '/material/container-body/组件框-下.png', '1460x520', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-下243.png', '/material/container-body/组件框-下243.png', '574x230', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-两侧.png', '/material/container-body/组件框-两侧.png', '450x942', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-右上.png', '/material/container-body/组件框-右上.png', '3000x518', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-右上2.png', '/material/container-body/组件框-右上2.png', '505x215', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-中.png', '/material/container-body/组件框-中.png', '804x285', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-左上.png', '/material/container-body/组件框-左上.png', '3000x1110', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-右下.png', '/material/container-body/组件框-右下.png', '505x335', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-左下.png', '/material/container-body/组件框-左下.png', '505x265', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框左右三@2x.png', '/material/container-body/组件框左右三@2x.png', '1034x634', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框.png', '/material/container-body/组件框.png', '504x285', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框中间.png', '/material/container-body/组件框中间.png', '1848x1972', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框左右一@2x.png', '/material/container-body/组件框左右一@2x.png', '1034x592', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框-左中.png', '/material/container-body/组件框-左中.png', '505x405', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件框左右二@2x.png', '/material/container-body/组件框左右二@2x.png', '1034x592', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('资源 15.png', '/material/container-body/资源 15.png', '415x596', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('表格框@2x.png', '/material/container-body/表格框@2x.png', '350x136', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('资源 18.png', '/material/container-body/资源 18.png', '402x266', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件边框2@2x.png', '/material/container-body/组件边框2@2x.png', '345x352', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组建框2.png', '/material/container-body/组建框2.png', '1870x586', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组件边框1@2x.png', '/material/container-body/组件边框1@2x.png', '678x303', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('组建框1.png', '/material/container-body/组建框1.png', '978x700', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('资源 2.png', '/material/container-body/资源 2.png', '517x455', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('资源 50@2x-8.png', '/material/container-body/资源 50@2x-8.png', '456x406', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('轮播带分割线背景.png', '/material/container-body/轮播带分割线背景.png', '1664x406', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1.png', '/material/header/1.png', '1281x120', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('进度达成.png', '/material/container-body/进度达成.png', '250x110', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('轮播表格背景.png', '/material/container-body/轮播表格背景.png', '1664x406', '2023-01-05 07:02:22.450', 1, 1, 'container', 'body');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('10.png', '/material/header/10.png', '1921x99', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('12.png', '/material/header/12.png', '600x39', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('11.png', '/material/header/11.png', '1831x94', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('13.png', '/material/header/13.png', '606x39', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('15.png', '/material/header/15.png', '3848x258', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('18.png', '/material/header/18.png', '1907x102', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('16.png', '/material/header/16.png', '1920x93', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('14.png', '/material/header/14.png', '1880x86', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('19.png', '/material/header/19.png', '2804x110', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('17.png', '/material/header/17.png', '1920x87', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('2.png', '/material/header/2.png', '3838x282', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('22.png', '/material/header/22.png', '3840x192', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('21.png', '/material/header/21.png', '3750x417', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('20.png', '/material/header/20.png', '1980x380', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('29.png', '/material/header/29.png', '1041x72', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('23.png', '/material/header/23.png', '1399x104', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('27.png', '/material/header/27.png', '3312x170', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('24.png', '/material/header/24.png', '1598x169', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('25.png', '/material/header/25.png', '2122x99', '2023-01-05 07:02:22.450', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('26.png', '/material/header/26.png', '3840x182', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('28.png', '/material/header/28.png', '1840x206', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('3.png', '/material/header/3.png', '3766x144', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6.png', '/material/header/6.png', '1917x168', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('5.png', '/material/header/5.png', '1920x101', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('8.png', '/material/header/8.png', '1890x102', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('30.png', '/material/header/30.png', '737x93', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('31.png', '/material/header/31.png', '3312x170', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('4.png', '/material/header/4.png', '1896x153', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('9.png', '/material/header/9.png', '1920x145', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7.png', '/material/header/7.png', '1864x59', '2023-01-05 07:02:22.451', 1, 1, 'header', '');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('6.png', '/material/container-head/6.png', '2469x48', '2023-01-05 08:49:33.194', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7背景框（选中效果）.png', '/material/container-head/7背景框（选中效果）.png', '396x109', '2023-01-05 08:51:24.780', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('7指标标题框整体@2x.png', '/material/container-head/7指标标题框整体@2x.png', '268x38', '2023-01-05 08:51:24.785', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('8.png', '/material/container-head/8.png', '540x16', '2023-01-05 08:51:57.212', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('9.png', '/material/container-head/9.png', '451x55', '2023-01-05 08:52:26.390', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('11-表头背景.png', '/material/container-head/11-表头背景.png', '403x60', '2023-01-05 08:53:02.264', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('14-小标题.png', '/material/container-head/14-小标题.png', '635x71', '2023-01-05 09:05:31.329', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('15-小标题.png', '/material/container-head/15-小标题.png', '814x71', '2023-01-05 09:06:06.945', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1622104850959703.png', '/material/container-head/1622104850959703.png', '511x39', '2023-01-05 09:06:37.579', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1622104876917335.png', '/material/container-head/1622104876917335.png', '491x91', '2023-01-05 09:07:15.458', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('1622104896680164.png', '/material/container-head/1622104896680164.png', '588x90', '2023-01-05 09:07:49.097', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('二级标题框.png', '/material/container-head/二级标题框.png', '756x80', '2023-01-05 09:08:21.004', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('小标题背景.png', '/material/container-head/小标题背景.png', '524x74', '2023-01-05 09:08:56.829', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('小标题装饰-右@2x.png', '/material/container-head/小标题装饰-右@2x.png', '135x13', '2023-01-05 09:09:37.565', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('小标题装饰-左@2x.png', '/material/container-head/小标题装饰-左@2x.png', '135x13', '2023-01-05 09:10:07.492', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('指标卡背景.png', '/material/container-head/指标卡背景.png', '778x190', '2023-01-05 09:13:05.690', 1, 1, 'container', 'head');
INSERT INTO xs_img (name, url, size, createTime, `delete`, state, bigType, smallType) VALUES ('左上背景.png', '/material/container-head/左上背景.png', '2138x350', '2023-01-05 09:13:32.002', 1, 1, 'container', 'head');