/*
  Warnings:

  - You are about to drop the column `is_active` on the `account` table. All the data in the column will be lost.
  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."skill" DROP CONSTRAINT "skill_ibfk_1";

-- AlterTable
ALTER TABLE "public"."account" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "public"."employee" DROP CONSTRAINT "employee_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(26),
ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."skill" ALTER COLUMN "employee_id" SET DATA TYPE VARCHAR(26);

-- AddForeignKey
ALTER TABLE "public"."skill" ADD CONSTRAINT "skill_ibfk_1" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
