-- CreateTable
CREATE TABLE "owner_has_services" (
    "id" SERIAL NOT NULL,
    "owner" INTEGER NOT NULL,
    "v_type" INTEGER NOT NULL,

    CONSTRAINT "owner_has_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "owner_has_services" ADD CONSTRAINT "owner_has_services_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_has_services" ADD CONSTRAINT "owner_has_services_v_type_fkey" FOREIGN KEY ("v_type") REFERENCES "type_of_vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
