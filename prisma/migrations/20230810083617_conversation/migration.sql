/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_convoId_fkey`;

-- DropTable
DROP TABLE `Messages`;

-- CreateTable
CREATE TABLE `Conversation` (
    `convoId` INTEGER NOT NULL AUTO_INCREMENT,
    `from` INTEGER NOT NULL,
    `to` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`convoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_convoId_fkey` FOREIGN KEY (`convoId`) REFERENCES `Conversation`(`convoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
