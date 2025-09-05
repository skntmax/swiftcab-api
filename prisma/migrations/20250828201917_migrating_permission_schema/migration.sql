-- CreateTable
CREATE TABLE "capabilities" (
    "id" SERIAL NOT NULL,
    "capability_name" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capabilities_have_permissions" (
    "id" SERIAL NOT NULL,
    "capability_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capabilities_have_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "capabilities_have_permissions_capability_id_permission_id_key" ON "capabilities_have_permissions"("capability_id", "permission_id");

-- AddForeignKey
ALTER TABLE "capabilities" ADD CONSTRAINT "capabilities_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capabilities_have_permissions" ADD CONSTRAINT "capabilities_have_permissions_capability_id_fkey" FOREIGN KEY ("capability_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capabilities_have_permissions" ADD CONSTRAINT "capabilities_have_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
