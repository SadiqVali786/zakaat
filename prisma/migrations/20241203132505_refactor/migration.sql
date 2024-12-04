/*
  Warnings:

  - Changed the type of `amount` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_Followers_AB_unique";
