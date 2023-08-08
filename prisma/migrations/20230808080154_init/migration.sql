-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(25) NOT NULL,
    `lastName` VARCHAR(25) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `profilePictureUrl` VARCHAR(255) NOT NULL,
    `bio` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `status` VARCHAR(55) NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
