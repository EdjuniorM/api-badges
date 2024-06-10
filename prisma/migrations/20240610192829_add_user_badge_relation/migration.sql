/*
  Warnings:

  - You are about to drop the column `userId` on the `Badge` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_userId_fkey";

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "BadgeUser" (
    "badgeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BadgeUser_pkey" PRIMARY KEY ("badgeId","userId")
);

-- AddForeignKey
ALTER TABLE "BadgeUser" ADD CONSTRAINT "BadgeUser_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeUser" ADD CONSTRAINT "BadgeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
