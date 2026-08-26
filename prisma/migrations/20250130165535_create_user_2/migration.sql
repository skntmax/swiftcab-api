-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_city_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "city_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
