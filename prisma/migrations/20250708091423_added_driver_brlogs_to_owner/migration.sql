/*
  Warnings:

  - A unique constraint covering the columns `[assigned_vhicle]` on the table `driver_belongs_to_owner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "driver_belongs_to_owner" ADD COLUMN     "assigned_vhicle" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "driver_belongs_to_owner_assigned_vhicle_key" ON "driver_belongs_to_owner"("assigned_vhicle");

-- AddForeignKey
ALTER TABLE "driver_belongs_to_owner" ADD CONSTRAINT "driver_belongs_to_owner_assigned_vhicle_fkey" FOREIGN KEY ("assigned_vhicle") REFERENCES "vhicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
