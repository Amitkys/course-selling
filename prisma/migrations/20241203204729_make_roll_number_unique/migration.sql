/*
  Warnings:

  - A unique constraint covering the columns `[rollNumber]` on the table `EmailWithRoll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailWithRoll_rollNumber_key" ON "EmailWithRoll"("rollNumber");
