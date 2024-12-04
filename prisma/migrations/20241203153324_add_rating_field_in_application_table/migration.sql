/*
  Warnings:

  - Added the required column `rating` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "rating" INTEGER NOT NULL;
