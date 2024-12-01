/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `numOfPosts` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `tweeteAuthorDonorId` on the `Tweet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweeteAuthorUserId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_tweeteAuthorDonorId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "numOfPosts",
ADD COLUMN     "numOfTweets" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "tweeteAuthorDonorId",
ADD COLUMN     "tweeteAuthorUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_tweeteAuthorUserId_fkey" FOREIGN KEY ("tweeteAuthorUserId") REFERENCES "Donor"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
