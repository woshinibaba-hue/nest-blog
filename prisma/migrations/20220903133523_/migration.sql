-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(30) NULL,
    `isBoss` INTEGER NULL DEFAULT 0,
    `github_id` INTEGER NULL,
    `github_url` VARCHAR(191) NULL,
    `password` VARCHAR(255) NULL,
    `mobile` CHAR(11) NULL,
    `avatar` VARCHAR(255) NULL,
    `status` INTEGER NULL DEFAULT 1,
    `auto` INTEGER NOT NULL,
    `referral` VARCHAR(255) NULL,
    `qqInfo` VARCHAR(1024) NULL,
    `unionid` VARCHAR(255) NULL,
    `createtime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatetime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
