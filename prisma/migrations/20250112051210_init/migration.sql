-- CreateTable
CREATE TABLE "Vhicle" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rc" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Vhicle_pkey" PRIMARY KEY ("id")
);
