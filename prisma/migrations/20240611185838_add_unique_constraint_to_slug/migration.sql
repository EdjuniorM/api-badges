/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Badge_slug_key" ON "Badge"("slug");
