/*
  Warnings:

  - The primary key for the `shc_have_localities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `price_per_km` to the `shc_have_localities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shc_have_localities" DROP CONSTRAINT "shc_have_localities_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "price_per_km" INTEGER NOT NULL,
ADD CONSTRAINT "shc_have_localities_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "users_have_rides" (
    "id" SERIAL NOT NULL,
    "vh_service_id" INTEGER NOT NULL,
    "pickup_time" TIMESTAMP(3) NOT NULL,
    "drop_time" TIMESTAMP(3) NOT NULL,
    "distance" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "source" INTEGER NOT NULL,
    "destination" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "total_price" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_have_rides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_vh_service_id_key" ON "users_have_rides"("vh_service_id");

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_vh_service_id_fkey" FOREIGN KEY ("vh_service_id") REFERENCES "vhicle_provides_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_source_fkey" FOREIGN KEY ("source") REFERENCES "shc_have_localities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_destination_fkey" FOREIGN KEY ("destination") REFERENCES "shc_have_localities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
