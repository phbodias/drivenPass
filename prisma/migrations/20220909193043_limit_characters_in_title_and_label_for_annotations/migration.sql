/*
  Warnings:

  - You are about to alter the column `text` on the `Annotations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `label` on the `Annotations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `expirationDate` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `securityCode` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `cvv` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annotations" ALTER COLUMN "text" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "label" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "expirationDate",
DROP COLUMN "securityCode",
ADD COLUMN     "cvv" TEXT NOT NULL,
ADD COLUMN     "expiration" TEXT NOT NULL;
