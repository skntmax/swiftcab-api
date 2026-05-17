-- DropIndex
DROP INDEX "users_have_rides_universal_ride_id_key";

-- AlterTable
ALTER TABLE "users_have_rides" ADD COLUMN     "cancelled_by" INTEGER,
ADD COLUMN     "reason" TEXT;
