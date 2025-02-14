/*
  Warnings:

  - A unique constraint covering the columns `[is_guide]` on the table `users_have_rides` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_food]` on the table `users_have_rides` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[is_water]` on the table `users_have_rides` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `is_food` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_guide` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_water` to the `users_have_rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "users_have_rides" ADD COLUMN     "is_food" INTEGER NOT NULL,
ADD COLUMN     "is_guide" INTEGER NOT NULL,
ADD COLUMN     "is_water" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_is_guide_key" ON "users_have_rides"("is_guide");

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_is_food_key" ON "users_have_rides"("is_food");

-- CreateIndex
CREATE UNIQUE INDEX "users_have_rides_is_water_key" ON "users_have_rides"("is_water");

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_guide_fkey" FOREIGN KEY ("is_guide") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_food_fkey" FOREIGN KEY ("is_food") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_have_rides" ADD CONSTRAINT "users_have_rides_is_water_fkey" FOREIGN KEY ("is_water") REFERENCES "utils_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
