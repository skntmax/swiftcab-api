-- CreateTable
CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "bank_name" VARCHAR(255),
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "banks_bank_name_idx" ON "banks"("bank_name");
