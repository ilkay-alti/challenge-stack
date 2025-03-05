/*
  Warnings:

  - You are about to drop the column `assetName` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `assetType` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `capitalSnapshot` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `percentage` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `assetSymbol` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capital` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('LONG', 'SHORT', 'BUY', 'SELL');

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "assetName",
DROP COLUMN "assetType",
DROP COLUMN "capitalSnapshot",
DROP COLUMN "percentage",
ADD COLUMN     "assetSymbol" TEXT NOT NULL,
ADD COLUMN     "capital" DOUBLE PRECISION NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;
