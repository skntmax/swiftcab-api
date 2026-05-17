/*
  Warnings:

  - A unique constraint covering the columns `[universal_ride_id]` on the table `users_have_rides` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users_have_rides" ADD COLUMN     "universal_ride_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_universal_ride_id_key" ON "users_have_rides"("universal_ride_id");
