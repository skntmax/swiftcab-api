/*
  Warnings:

  - You are about to drop the column `other_doc` on the `vhicle` table. All the data in the column will be lost.
  - You are about to drop the column `docs` on the `vhicle_has_other_docs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vhicle" DROP COLUMN "other_doc";

-- AlterTable
ALTER TABLE "vhicle_has_other_docs" DROP COLUMN "docs",
ADD COLUMN     "basePath" TEXT,
ADD COLUMN     "doc_id" TEXT;
