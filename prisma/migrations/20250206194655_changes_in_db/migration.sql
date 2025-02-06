/*
  Warnings:

  - You are about to drop the column `v_owner_id` on the `vhicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vhicle_owner_id]` on the table `vhicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vhicle_owner_id` to the `vhicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "owner_has_vhicles" DROP CONSTRAINT "owner_has_vhicles_owner_fkey";

-- DropForeignKey
ALTER TABLE "owner_has_vhicles" DROP CONSTRAINT "owner_has_vhicles_v_type_fkey";

-- DropForeignKey
ALTER TABLE "vhicle" DROP CONSTRAINT "vhicle_v_owner_id_fkey";

-- DropIndex
DROP INDEX "vhicle_v_owner_id_key";

-- AlterTable
ALTER TABLE "vhicle" DROP COLUMN "v_owner_id",
ADD COLUMN     "vhicle_owner_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vhicle_vhicle_owner_id_key" ON "vhicle"("vhicle_owner_id");

-- AddForeignKey
ALTER TABLE "vhicle" ADD CONSTRAINT "vhicle_vhicle_owner_id_fkey" FOREIGN KEY ("vhicle_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
