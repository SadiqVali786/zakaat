/*
  Warnings:

  - You are about to drop the column `bookmarkedById` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `donatedById` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedById` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `tweetedBy` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tweeteAuthorDonorId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_acceptorId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_bookmarkedById_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_donatedById_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_verifiedById_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_tweetedBy_fkey";

-- DropIndex
DROP INDEX "Donor_username_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "bookmarkedById",
DROP COLUMN "donatedById",
DROP COLUMN "verifiedById",
ADD COLUMN     "bookmarkedDonorUserId" TEXT,
ADD COLUMN     "donatedDonorUserId" TEXT,
ADD COLUMN     "verifiedUserId" TEXT;

-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "tweetedBy",
ADD COLUMN     "tweeteAuthorDonorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_tweeteAuthorDonorId_fkey" FOREIGN KEY ("tweeteAuthorDonorId") REFERENCES "Donor"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_acceptorId_fkey" FOREIGN KEY ("acceptorId") REFERENCES "Acceptor"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_verifiedUserId_fkey" FOREIGN KEY ("verifiedUserId") REFERENCES "Verifier"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_donatedDonorUserId_fkey" FOREIGN KEY ("donatedDonorUserId") REFERENCES "Donor"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_bookmarkedDonorUserId_fkey" FOREIGN KEY ("bookmarkedDonorUserId") REFERENCES "Donor"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
