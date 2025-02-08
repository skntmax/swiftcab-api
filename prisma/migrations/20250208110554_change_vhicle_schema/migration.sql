/*
  Warnings:

  - Added the required column `model` to the `vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `vhicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vhicle" ADD COLUMN     "chassis_number" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "engine_number" TEXT,
ADD COLUMN     "fuel_type" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "license_plate" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "transmission" TEXT NOT NULL,
ADD COLUMN     "vin" TEXT,
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL;
