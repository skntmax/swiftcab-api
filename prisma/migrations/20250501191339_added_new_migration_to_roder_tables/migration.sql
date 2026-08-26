-- CreateTable
CREATE TABLE "driver_belongs_to_owner" (
    "id" SERIAL NOT NULL,
    "owner" INTEGER NOT NULL,
    "driver" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_belongs_to_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_profile" (
    "id" SERIAL NOT NULL,
    "DL" TEXT,
    "RC" TEXT,
    "insurance" TEXT,
    "pan_card" TEXT,
    "adhar_card" TEXT,
    "driver" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_profile_driver_key" ON "driver_profile"("driver");

-- AddForeignKey
ALTER TABLE "driver_belongs_to_owner" ADD CONSTRAINT "driver_belongs_to_owner_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_belongs_to_owner" ADD CONSTRAINT "driver_belongs_to_owner_driver_fkey" FOREIGN KEY ("driver") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_profile" ADD CONSTRAINT "driver_profile_driver_fkey" FOREIGN KEY ("driver") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
