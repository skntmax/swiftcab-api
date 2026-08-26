/*
  Warnings:

  - Added the required column `updated_on` to the `owner_has_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "owner_has_services" ADD COLUMN     "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_on" TIMESTAMP(3) NOT NULL;
