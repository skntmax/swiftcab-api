/*
  Warnings:

  - The primary key for the `Vhicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vhicle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vhicle` table. All the data in the column will be lost.
  - You are about to drop the column `rc` on the `Vhicle` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Vhicle` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Vhicle` table. All the data in the column will be lost.
  - Added the required column `CREATED_ON` to the `Vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAME` to the `Vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RC` to the `Vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TYPE` to the `Vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UPDATED_ON` to the `Vhicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `USERNAME` to the `Vhicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vhicle" DROP CONSTRAINT "Vhicle_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "rc",
DROP COLUMN "type",
DROP COLUMN "username",
ADD COLUMN     "CREATED_ON" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ID" SERIAL NOT NULL,
ADD COLUMN     "NAME" TEXT NOT NULL,
ADD COLUMN     "RC" TEXT NOT NULL,
ADD COLUMN     "TYPE" TEXT NOT NULL,
ADD COLUMN     "UPDATED_ON" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "USERNAME" TEXT NOT NULL,
ADD CONSTRAINT "Vhicle_pkey" PRIMARY KEY ("ID");
