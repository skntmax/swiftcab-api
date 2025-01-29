-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "user_type" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_of_user" (
    "id" SERIAL NOT NULL,
    "user_type" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_of_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states_have_cities" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "states_have_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shc_have_localities" (
    "shc_id" INTEGER NOT NULL,
    "locality_id" INTEGER NOT NULL,

    CONSTRAINT "shc_have_localities_pkey" PRIMARY KEY ("shc_id","locality_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_type_key" ON "users"("user_type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_fkey" FOREIGN KEY ("user_type") REFERENCES "type_of_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states_have_cities" ADD CONSTRAINT "states_have_cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states_have_cities" ADD CONSTRAINT "states_have_cities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shc_have_localities" ADD CONSTRAINT "shc_have_localities_shc_id_fkey" FOREIGN KEY ("shc_id") REFERENCES "states_have_cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shc_have_localities" ADD CONSTRAINT "shc_have_localities_locality_id_fkey" FOREIGN KEY ("locality_id") REFERENCES "localities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
