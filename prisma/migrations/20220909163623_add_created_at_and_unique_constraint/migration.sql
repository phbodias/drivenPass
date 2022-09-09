/*
  Warnings:

  - A unique constraint covering the columns `[label,userId]` on the table `Annotations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label,userId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Annotations_label_userId_key" ON "Annotations"("label", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_label_userId_key" ON "Cards"("label", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_label_userId_key" ON "Credentials"("label", "userId");
