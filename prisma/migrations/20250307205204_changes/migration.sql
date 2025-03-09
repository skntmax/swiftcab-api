-- CreateEnum
CREATE TYPE "LoginBy" AS ENUM ('SWIFTCAB', 'GOOGLE', 'FACEBOOK', 'MICROSOFT', 'OTHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "traffic_from" "LoginBy" NOT NULL DEFAULT 'SWIFTCAB';
