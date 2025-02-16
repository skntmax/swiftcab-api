/*
  Warnings:

  - A unique constraint covering the columns `[role_id,nav_item_id]` on the table `nav_has_permission_by_role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nav_has_permission_by_role_role_id_nav_item_id_key" ON "nav_has_permission_by_role"("role_id", "nav_item_id");
