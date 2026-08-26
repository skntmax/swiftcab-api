/*
  Warnings:

  - You are about to drop the column `isKyc` on the `vhicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vhicle" DROP COLUMN "isKyc",
ADD COLUMN     "is_kyc" BOOLEAN NOT NULL DEFAULT false;
