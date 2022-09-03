-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `isBoss` INTEGER NOT NULL DEFAULT 0,
    `github_id` INTEGER NOT NULL,
    `github_url` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `mobile` CHAR(11) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `auto` INTEGER NOT NULL,
    `referral` VARCHAR(255) NOT NULL,
    `createtime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatetime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
