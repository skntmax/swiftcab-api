/*
  Warnings:

  - You are about to drop the column `is_running` on the `users_have_rides` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users_have_rides" DROP COLUMN "is_running",
ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "otp_varified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ride_started" BOOLEAN NOT NULL DEFAULT false;
