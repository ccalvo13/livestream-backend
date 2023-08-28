/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `File_roomId_key` ON `File`(`roomId`);
