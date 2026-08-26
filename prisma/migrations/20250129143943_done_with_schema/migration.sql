/*
  Warnings:

  - You are about to drop the column `type` on the `vhicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vhicle_type_id]` on the table `vhicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[v_owner_id]` on the table `vhicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_on` to the `shc_have_localities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_on` to the `states_have_cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `v_owner_id` to the `vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vhicle_type_id` to the `vhicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shc_have_localities" ADD COLUMN     "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_on" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "states_have_cities" ADD COLUMN     "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_on" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vhicle" DROP COLUMN "type",
ADD COLUMN     "v_owner_id" INTEGER NOT NULL,
ADD COLUMN     "vhicle_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "type_of_vhicle" (
    "id" SERIAL NOT NULL,
    "vhicle_type" INTEGER NOT NULL,
    "disc" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_of_vhicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vhicle_vhicle_type_id_key" ON "vhicle"("vhicle_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "vhicle_v_owner_id_key" ON "vhicle"("v_owner_id");

-- AddForeignKey
ALTER TABLE "vhicle" ADD CONSTRAINT "vhicle_vhicle_type_id_fkey" FOREIGN KEY ("vhicle_type_id") REFERENCES "type_of_vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vhicle" ADD CONSTRAINT "vhicle_v_owner_id_fkey" FOREIGN KEY ("v_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
