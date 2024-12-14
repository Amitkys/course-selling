/*
  Warnings:

  - Made the column `rollNumber` on table `EmailWithRoll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmailWithRoll" ALTER COLUMN "rollNumber" SET NOT NULL;
