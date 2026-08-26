-- CreateTable
CREATE TABLE "bank_branch" (
    "id" SERIAL NOT NULL,
    "branch_name" VARCHAR(255),
    "bank_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_branch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_branch" ADD CONSTRAINT "bank_branch_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
