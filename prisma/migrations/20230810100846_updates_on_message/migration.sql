/*
  Warnings:

  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Message` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `convoId`);
