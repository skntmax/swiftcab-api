-- DropForeignKey
ALTER TABLE "public"."capabilities_have_permissions" DROP CONSTRAINT "capabilities_have_permissions_capability_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."capabilities_have_permissions" ADD CONSTRAINT "capabilities_have_permissions_capability_id_fkey" FOREIGN KEY ("capability_id") REFERENCES "public"."capabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
