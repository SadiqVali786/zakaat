/*
  Warnings:

  - You are about to drop the column `acceptorId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `bookmarkedDonorUserId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `donatedDonorUserId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedUserId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `tweeteAuthorUserId` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `Acceptor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Donor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Verifier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetAuthorId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Acceptor" DROP CONSTRAINT "Acceptor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_acceptorId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_bookmarkedDonorUserId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_donatedDonorUserId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_verifiedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_tweeteAuthorUserId_fkey";

-- DropForeignKey
ALTER TABLE "Verifier" DROP CONSTRAINT "Verifier_userId_fkey";

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_B_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "acceptorId",
DROP COLUMN "bookmarkedDonorUserId",
DROP COLUMN "donatedDonorUserId",
DROP COLUMN "verifiedUserId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "bookmarkedDonorId" TEXT,
ADD COLUMN     "donatedDonorId" TEXT,
ADD COLUMN     "hide" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifiedByUserId" TEXT;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "tweeteAuthorUserId",
ADD COLUMN     "tweetAuthorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- DropTable
DROP TABLE "Acceptor";

-- DropTable
DROP TABLE "Donor";

-- DropTable
DROP TABLE "Verifier";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_bookmarkedDonorId_fkey" FOREIGN KEY ("bookmarkedDonorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_donatedDonorId_fkey" FOREIGN KEY ("donatedDonorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_verifiedByUserId_fkey" FOREIGN KEY ("verifiedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_tweetAuthorId_fkey" FOREIGN KEY ("tweetAuthorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
