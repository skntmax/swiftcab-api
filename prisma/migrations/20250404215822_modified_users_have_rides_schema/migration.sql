/*
  Warnings:

  - Added the required column `travel_way` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_have_rides" ADD COLUMN     "destination_lat" DOUBLE PRECISION,
ADD COLUMN     "destination_lng" DOUBLE PRECISION,
ADD COLUMN     "destination_name" TEXT,
ADD COLUMN     "pickup_date" TIMESTAMP(3),
ADD COLUMN     "return_date" TIMESTAMP(3),
ADD COLUMN     "source_lat" DOUBLE PRECISION,
ADD COLUMN     "source_lng" DOUBLE PRECISION,
ADD COLUMN     "source_name" TEXT,
ADD COLUMN     "travel_way" INTEGER NOT NULL,
ALTER COLUMN "pickup_time" DROP NOT NULL,
ALTER COLUMN "drop_time" DROP NOT NULL,
ALTER COLUMN "distance" DROP NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "vhicle_provides_services" ADD COLUMN     "engaged" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_travel_way_fkey" FOREIGN KEY ("travel_way") REFERENCES "travel_ways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
