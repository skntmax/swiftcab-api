/*
  Warnings:

  - Added the required column `is_food` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_guide` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_water` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('INITIATED', 'PENDING', 'VERIFIED');

-- AlterTable
ALTER TABLE "users_have_rides" ADD COLUMN     "is_food" INTEGER NOT NULL,
ADD COLUMN     "is_guide" INTEGER NOT NULL,
ADD COLUMN     "is_water" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vhicle" ADD COLUMN     "kyc_varification" "KycStatus" NOT NULL DEFAULT 'INITIATED';

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_guide_fkey" FOREIGN KEY ("is_guide") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_food_fkey" FOREIGN KEY ("is_food") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_water_fkey" FOREIGN KEY ("is_water") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
