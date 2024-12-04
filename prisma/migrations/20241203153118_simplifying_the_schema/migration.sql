/*
  Warnings:

  - You are about to drop the column `bookmarkedDonorId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `donatedDonorId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedByUserId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_bookmarkedDonorId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_donatedDonorId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_verifiedByUserId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "bookmarkedDonorId",
DROP COLUMN "donatedDonorId",
DROP COLUMN "verifiedByUserId",
ADD COLUMN     "bookmarkedByDonorId" TEXT,
ADD COLUMN     "donatedByDonorId" TEXT,
ADD COLUMN     "verifiedByVerifierId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Address";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_bookmarkedByDonorId_fkey" FOREIGN KEY ("bookmarkedByDonorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_donatedByDonorId_fkey" FOREIGN KEY ("donatedByDonorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_verifiedByVerifierId_fkey" FOREIGN KEY ("verifiedByVerifierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
