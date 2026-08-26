/*
  Warnings:

  - A unique constraint covering the columns `[bank_account_no]` on the table `driver_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "driver_profile" ADD COLUMN     "bank_account_no" BIGINT,
ADD COLUMN     "passbook" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_bank_account_no_key" ON "driver_profile"("bank_account_no");
