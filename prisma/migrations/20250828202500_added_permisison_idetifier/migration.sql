/*
  Warnings:

  - A unique constraint covering the columns `[permission_id]` on the table `sub_nav_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sub_nav_items" ADD COLUMN     "permission_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "sub_nav_items_permission_id_key" ON "sub_nav_items"("permission_id");

-- AddForeignKey
ALTER TABLE "sub_nav_items" ADD CONSTRAINT "sub_nav_items_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
