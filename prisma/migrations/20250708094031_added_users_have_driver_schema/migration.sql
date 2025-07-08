/*
  Warnings:

  - You are about to drop the column `total_price` on the `users_have_rides` table. All the data in the column will be lost.
  - You are about to drop the column `vh_service_id` on the `users_have_rides` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vhicle_driver]` on the table `users_have_rides` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total_fare` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vhicle_driver` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "payMethod" AS ENUM ('UPI', 'CASH', 'ONLINE');

-- DropForeignKey
ALTER TABLE "users_have_rides" DROP CONSTRAINT "users_have_rides_vh_service_id_fkey";

-- DropIndex
DROP INDEX "users_have_rides_vh_service_id_key";

-- AlterTable
ALTER TABLE "driver_belongs_to_owner" ADD COLUMN     "engaged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users_have_rides" DROP COLUMN "total_price",
DROP COLUMN "vh_service_id",
ADD COLUMN     "is_running" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_method" "payMethod" NOT NULL DEFAULT 'CASH',
ADD COLUMN     "total_fare" INTEGER NOT NULL,
ADD COLUMN     "vhicle_driver" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_vhicle_driver_key" ON "users_have_rides"("vhicle_driver");

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_vhicle_driver_fkey" FOREIGN KEY ("vhicle_driver") REFERENCES "driver_belongs_to_owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
