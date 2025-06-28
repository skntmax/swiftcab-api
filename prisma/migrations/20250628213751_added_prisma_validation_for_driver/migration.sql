/*
  Warnings:

  - The `bank_account` column on the `driver_profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bank_account_branch` column on the `driver_profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "driver_profile" DROP COLUMN "bank_account",
ADD COLUMN     "bank_account" INTEGER,
DROP COLUMN "bank_account_branch",
ADD COLUMN     "bank_account_branch" INTEGER;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_bank_account_fkey" FOREIGN KEY ("bank_account") REFERENCES "banks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_bank_account_branch_fkey" FOREIGN KEY ("bank_account_branch") REFERENCES "bank_branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
