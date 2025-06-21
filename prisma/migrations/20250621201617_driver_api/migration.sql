-- AlterTable
ALTER TABLE "driver_profile" ALTER COLUMN "engaged" SET DEFAULT false;

-- AlterTable
ALTER TABLE "sub_nav_items" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
