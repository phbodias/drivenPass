/*
  Warnings:

  - You are about to alter the column `text` on the `Annotations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `label` on the `Annotations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Annotations" ALTER COLUMN "text" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "label" SET DATA TYPE VARCHAR(50);
