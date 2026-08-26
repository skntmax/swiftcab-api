/*
  Warnings:

  - You are about to drop the column `destination` on the `users_have_rides` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `users_have_rides` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."users_have_rides" DROP CONSTRAINT "users_have_rides_destination_fkey";

-- DropForeignKey
ALTER TABLE "public"."users_have_rides" DROP CONSTRAINT "users_have_rides_source_fkey";

-- AlterTable
ALTER TABLE "public"."users_have_rides" DROP COLUMN "destination",
DROP COLUMN "source";
