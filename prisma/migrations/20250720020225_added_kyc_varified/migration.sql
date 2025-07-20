/*
  Warnings:

  - The `is_varified` column on the `driver_profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "driver_profile" DROP COLUMN "is_varified",
ADD COLUMN     "is_varified" "KycStatus" NOT NULL DEFAULT 'INITIATED';
