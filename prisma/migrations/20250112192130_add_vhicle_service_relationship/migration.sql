-- AlterTable
ALTER TABLE "vhicle" ALTER COLUMN "created_on" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "vhicle_services" ALTER COLUMN "created_on" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "vhicle_provides_services" (
    "id" SERIAL NOT NULL,
    "vhicle_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vhicle_provides_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vhicle_provides_services_vhicle_id_service_id_key" ON "vhicle_provides_services"("vhicle_id", "service_id");

-- AddForeignKey
ALTER TABLE "vhicle_provides_services" ADD CONSTRAINT "vhicle_provides_services_vhicle_id_fkey" FOREIGN KEY ("vhicle_id") REFERENCES "vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vhicle_provides_services" ADD CONSTRAINT "vhicle_provides_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "vhicle_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
