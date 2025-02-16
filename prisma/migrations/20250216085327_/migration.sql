/*
  Warnings:

  - You are about to drop the `_nav_item_perm_by_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_nav_perm_by_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_nav_item_perm_by_role" DROP CONSTRAINT "_nav_item_perm_by_role_A_fkey";

-- DropForeignKey
ALTER TABLE "_nav_item_perm_by_role" DROP CONSTRAINT "_nav_item_perm_by_role_B_fkey";

-- DropForeignKey
ALTER TABLE "_nav_perm_by_roles" DROP CONSTRAINT "_nav_perm_by_roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_nav_perm_by_roles" DROP CONSTRAINT "_nav_perm_by_roles_B_fkey";

-- AlterTable
ALTER TABLE "vhicle" ALTER COLUMN "kyc_varification" SET DEFAULT 'PENDING';

-- DropTable
DROP TABLE "_nav_item_perm_by_role";

-- DropTable
DROP TABLE "_nav_perm_by_roles";

-- AddForeignKey
ALTER TABLE "nav_has_permission_by_role" ADD CONSTRAINT "nav_has_permission_by_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nav_has_permission_by_role" ADD CONSTRAINT "nav_has_permission_by_role_nav_item_id_fkey" FOREIGN KEY ("nav_item_id") REFERENCES "nav_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
