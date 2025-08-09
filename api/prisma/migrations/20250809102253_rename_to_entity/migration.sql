/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."user_name";

-- AlterTable
ALTER TABLE "public"."account" DROP CONSTRAINT "account_pkey",
DROP COLUMN "user_id",
DROP COLUMN "user_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "account_name_key" ON "public"."account"("name");
