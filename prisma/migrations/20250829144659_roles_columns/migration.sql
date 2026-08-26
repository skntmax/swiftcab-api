/*
  Warnings:

  - A unique constraint covering the columns `[name,label]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "label" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_label_key" ON "roles"("name", "label");
