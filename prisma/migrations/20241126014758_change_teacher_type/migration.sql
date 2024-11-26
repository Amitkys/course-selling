/*
  Warnings:

  - Changed the type of `teacher` on the `Opinion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TeacherName" AS ENUM ('AMIT', 'RAHUL', 'KISHOR');

-- AlterTable
ALTER TABLE "Opinion" DROP COLUMN "teacher",
ADD COLUMN     "teacher" "TeacherName" NOT NULL;
