-- CreateTable
CREATE TABLE "nav_items" (
    "id" SERIAL NOT NULL,
    "nav_item" TEXT,
    "sub_menu" BOOLEAN NOT NULL DEFAULT false,
    "href" TEXT,
    "icon" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nav_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_nav_items" (
    "id" SERIAL NOT NULL,
    "sub_nav_item" TEXT,
    "sub_menu" BOOLEAN NOT NULL DEFAULT false,
    "href" TEXT,
    "icon" TEXT,
    "nav_item_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_nav_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nav_has_permission_by_role" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "nav_item_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nav_has_permission_by_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_nav_perm_by_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_nav_perm_by_roles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_nav_item_perm_by_role" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_nav_item_perm_by_role_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_nav_perm_by_roles_B_index" ON "_nav_perm_by_roles"("B");

-- CreateIndex
CREATE INDEX "_nav_item_perm_by_role_B_index" ON "_nav_item_perm_by_role"("B");

-- AddForeignKey
ALTER TABLE "sub_nav_items" ADD CONSTRAINT "sub_nav_items_nav_item_id_fkey" FOREIGN KEY ("nav_item_id") REFERENCES "nav_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_nav_perm_by_roles" ADD CONSTRAINT "_nav_perm_by_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "nav_has_permission_by_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_nav_perm_by_roles" ADD CONSTRAINT "_nav_perm_by_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_nav_item_perm_by_role" ADD CONSTRAINT "_nav_item_perm_by_role_A_fkey" FOREIGN KEY ("A") REFERENCES "nav_has_permission_by_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_nav_item_perm_by_role" ADD CONSTRAINT "_nav_item_perm_by_role_B_fkey" FOREIGN KEY ("B") REFERENCES "nav_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
