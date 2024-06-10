/*
  Warnings:

  - You are about to drop the `BadgeUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BadgeUser" DROP CONSTRAINT "BadgeUser_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "BadgeUser" DROP CONSTRAINT "BadgeUser_userId_fkey";

-- DropTable
DROP TABLE "BadgeUser";

-- CreateTable
CREATE TABLE "UserBadge" (
    "badgeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("badgeId","userId")
);

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
