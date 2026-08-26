-- AlterTable
ALTER TABLE "vhicle" ADD COLUMN     "other_doc" TEXT,
ADD COLUMN     "rc_doc" TEXT,
ADD COLUMN     "ss_one" TEXT DEFAULT '',
ADD COLUMN     "ss_two" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "vhicle_has_other_docs" (
    "id" SERIAL NOT NULL,
    "vhicle_id" INTEGER NOT NULL,
    "docs" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vhicle_has_other_docs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vhicle_has_other_docs" ADD CONSTRAINT "vhicle_has_other_docs_vhicle_id_fkey" FOREIGN KEY ("vhicle_id") REFERENCES "vhicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
