/*
  Warnings:

  - You are about to drop the column `firstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `student` table. All the data in the column will be lost.
  - Added the required column `Regno` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `Regno` VARCHAR(191) NOT NULL;
