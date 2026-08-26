/*
  Warnings:

  - Made the column `bank_account` on table `driver_profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bank_account_branch` on table `driver_profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "driver_profile" DROP CONSTRAINT "driver_profile_bank_account_branch_fkey";

-- DropForeignKey
ALTER TABLE "driver_profile" DROP CONSTRAINT "driver_profile_bank_account_fkey";

-- AlterTable
ALTER TABLE "driver_profile" ALTER COLUMN "bank_account" SET NOT NULL,
ALTER COLUMN "bank_account_branch" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_bank_account_fkey" FOREIGN KEY ("bank_account") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_bank_account_branch_fkey" FOREIGN KEY ("bank_account_branch") REFERENCES "bank_branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
