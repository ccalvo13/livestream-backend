/*
  Warnings:

  - You are about to drop the column `name` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `name`,
    ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;
