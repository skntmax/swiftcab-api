/*
  Warnings:

  - Added the required column `updated_by` to the `driver_belongs_to_owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driver_belongs_to_owner" ADD COLUMN     "self" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "driver_belongs_to_owner" ADD CONSTRAINT "driver_belongs_to_owner_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
