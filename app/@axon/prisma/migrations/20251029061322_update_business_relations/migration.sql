/*
  Warnings:

  - A unique constraint covering the columns `[phone_normalized]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_normalized` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformRole" AS ENUM ('ADMIN', 'BUSINESS_OWNER', 'STAFF');

-- CreateEnum
CREATE TYPE "BusinessRole" AS ENUM ('OWNER', 'STAFF');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "created_by_id" TEXT,
ADD COLUMN     "phone_normalized" TEXT NOT NULL,
ADD COLUMN     "status" "BusinessStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
ADD COLUMN     "whatsapp_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT,
    "avatar_url" TEXT,
    "role" "PlatformRole" NOT NULL DEFAULT 'BUSINESS_OWNER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessMember" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "role" "BusinessRole" NOT NULL DEFAULT 'STAFF',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "BusinessMember_business_id_idx" ON "BusinessMember"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessMember_user_id_business_id_key" ON "BusinessMember"("user_id", "business_id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_phone_normalized_key" ON "Business"("phone_normalized");

-- AddForeignKey
ALTER TABLE "BusinessMember" ADD CONSTRAINT "BusinessMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessMember" ADD CONSTRAINT "BusinessMember_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
