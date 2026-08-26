/*
  Warnings:

  - You are about to drop the `owner_has_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "owner_has_services" DROP CONSTRAINT "owner_has_services_owner_fkey";

-- DropForeignKey
ALTER TABLE "owner_has_services" DROP CONSTRAINT "owner_has_services_v_type_fkey";

-- DropTable
DROP TABLE "owner_has_services";

-- CreateTable
CREATE TABLE "owner_has_vhicles" (
    "id" SERIAL NOT NULL,
    "owner" INTEGER NOT NULL,
    "v_type" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owner_has_vhicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "owner_has_vhicles" ADD CONSTRAINT "owner_has_vhicles_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_has_vhicles" ADD CONSTRAINT "owner_has_vhicles_v_type_fkey" FOREIGN KEY ("v_type") REFERENCES "type_of_vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
