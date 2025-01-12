-- CreateTable
CREATE TABLE "services_have_utils" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "guide" BOOLEAN NOT NULL DEFAULT false,
    "food" BOOLEAN NOT NULL DEFAULT false,
    "water" BOOLEAN NOT NULL DEFAULT false,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_have_utils_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services_have_utils" ADD CONSTRAINT "services_have_utils_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "vhicle_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
