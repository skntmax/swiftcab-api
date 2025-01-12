/*
  Warnings:

  - You are about to drop the `Vhicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Vhicle";

-- CreateTable
CREATE TABLE "vhicle" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vhicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vhicle_services" (
    "id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vhicle_services_pkey" PRIMARY KEY ("id")
);
