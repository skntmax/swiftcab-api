-- CreateTable
CREATE TABLE "travel_ways" (
    "id" SERIAL NOT NULL,
    "travel_way" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_ways_pkey" PRIMARY KEY ("id")
);
