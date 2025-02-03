/*
  Warnings:

  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_type_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_type";
