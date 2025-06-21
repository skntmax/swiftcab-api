/*
  Warnings:

  - You are about to drop the `_nav_item_perm_by_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_nav_perm_by_roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[engaged_with_owner]` on the table `driver_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[engaged_with_vhicle]` on the table `driver_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_code]` on the table `driver_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_balance]` on the table `driver_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('INITIATED', 'PENDING', 'VERIFIED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "_nav_item_perm_by_role" DROP CONSTRAINT "_nav_item_perm_by_role_A_fkey";

-- DropForeignKey
ALTER TABLE "_nav_item_perm_by_role" DROP CONSTRAINT "_nav_item_perm_by_role_B_fkey";

-- DropForeignKey
ALTER TABLE "_nav_perm_by_roles" DROP CONSTRAINT "_nav_perm_by_roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_nav_perm_by_roles" DROP CONSTRAINT "_nav_perm_by_roles_B_fkey";

-- AlterTable
ALTER TABLE "driver_profile" ADD COLUMN     "bank_account" TEXT,
ADD COLUMN     "bank_account_branch" TEXT,
ADD COLUMN     "engaged" BOOLEAN,
ADD COLUMN     "engaged_with_owner" INTEGER,
ADD COLUMN     "engaged_with_vhicle" INTEGER,
ADD COLUMN     "ifsc" TEXT,
ADD COLUMN     "is_bank_varified" BOOLEAN DEFAULT false,
ADD COLUMN     "wallet_balance" INTEGER DEFAULT 0,
ADD COLUMN     "wallet_code" TEXT;

-- AlterTable
ALTER TABLE "vhicle" ADD COLUMN     "kyc_varification" "KycStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "_nav_item_perm_by_role";

-- DropTable
DROP TABLE "_nav_perm_by_roles";

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_engaged_with_owner_key" ON "driver_profile"("engaged_with_owner");

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_engaged_with_vhicle_key" ON "driver_profile"("engaged_with_vhicle");

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_wallet_code_key" ON "driver_profile"("wallet_code");

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_wallet_balance_key" ON "driver_profile"("wallet_balance");

-- AddForeignKey
ALTER TABLE "nav_has_permission_by_role" ADD CONSTRAINT "nav_has_permission_by_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nav_has_permission_by_role" ADD CONSTRAINT "nav_has_permission_by_role_nav_item_id_fkey" FOREIGN KEY ("nav_item_id") REFERENCES "nav_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_engaged_with_owner_fkey" FOREIGN KEY ("engaged_with_owner") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_engaged_with_vhicle_fkey" FOREIGN KEY ("engaged_with_vhicle") REFERENCES "vhicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
