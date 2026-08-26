/*
  Warnings:

  - You are about to drop the column `city` on the `localities` table. All the data in the column will be lost.
  - Added the required column `locality` to the `localities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "localities" DROP COLUMN "city",
ADD COLUMN     "locality" TEXT NOT NULL;
