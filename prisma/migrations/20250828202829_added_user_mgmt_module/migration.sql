/*
  Warnings:

  - A unique constraint covering the columns `[capability_name,capability_identifier]` on the table `capabilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permission_name,permission_identifer]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "capabilities" ADD COLUMN     "capability_identifier" TEXT;

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "permission_identifer" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "capabilities_capability_name_capability_identifier_key" ON "capabilities"("capability_name", "capability_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permission_name_permission_identifer_key" ON "permissions"("permission_name", "permission_identifer");
