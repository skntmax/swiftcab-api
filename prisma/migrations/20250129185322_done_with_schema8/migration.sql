/*
  Warnings:

  - A unique constraint covering the columns `[city_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locality_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "locality_id" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone_no" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "utils_status_names" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utils_status_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utils_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utils_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utils_config" (
    "id" SERIAL NOT NULL,
    "sun_id" INTEGER NOT NULL,
    "sus_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utils_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_city_id_key" ON "users"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_locality_id_key" ON "users"("locality_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_locality_id_fkey" FOREIGN KEY ("locality_id") REFERENCES "localities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utils_config" ADD CONSTRAINT "utils_config_sun_id_fkey" FOREIGN KEY ("sun_id") REFERENCES "utils_status_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utils_config" ADD CONSTRAINT "utils_config_sus_id_fkey" FOREIGN KEY ("sus_id") REFERENCES "utils_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
