-- /*
--   Warnings:

--   - A unique constraint covering the columns `[vhicle_type_id]` on the table `vhicle` will be added. If there are existing duplicate values, this will fail.

-- */
-- -- AlterEnum
-- -- ALTER TYPE "KycStatus" ADD VALUE 'COMPLETED';

-- -- DropForeignKey
-- ALTER TABLE "vhicle" DROP CONSTRAINT "vhicle_vhicle_type_id_fkey";

-- -- CreateIndex
-- CREATE UNIQUE INDEX "vhicle_vhicle_type_id_key" ON "vhicle"("vhicle_type_id");

-- -- AddForeignKey
-- ALTER TABLE "vhicle" ADD CONSTRAINT "vhicle_vhicle_type_id_fkey" FOREIGN KEY ("vhicle_type_id") REFERENCES "vhicle_provides_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "owner_has_vhicles" ADD CONSTRAINT "owner_has_vhicles_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "owner_has_vhicles" ADD CONSTRAINT "owner_has_vhicles_v_type_fkey" FOREIGN KEY ("v_type") REFERENCES "type_of_vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
