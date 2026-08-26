/*
  Warnings:

  - You are about to drop the column `sun_id` on the `utils_config` table. All the data in the column will be lost.
  - You are about to drop the column `sus_id` on the `utils_config` table. All the data in the column will be lost.
  - Added the required column `us_id` to the `utils_config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usn_id` to the `utils_config` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "utils_config" DROP CONSTRAINT "utils_config_sun_id_fkey";

-- DropForeignKey
ALTER TABLE "utils_config" DROP CONSTRAINT "utils_config_sus_id_fkey";

-- AlterTable
ALTER TABLE "utils_config" DROP COLUMN "sun_id",
DROP COLUMN "sus_id",
ADD COLUMN     "us_id" INTEGER NOT NULL,
ADD COLUMN     "usn_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "utils_config" ADD CONSTRAINT "utils_config_usn_id_fkey" FOREIGN KEY ("usn_id") REFERENCES "utils_status_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utils_config" ADD CONSTRAINT "utils_config_us_id_fkey" FOREIGN KEY ("us_id") REFERENCES "utils_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
