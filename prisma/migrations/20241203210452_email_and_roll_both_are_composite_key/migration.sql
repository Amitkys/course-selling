/*
  Warnings:

  - A unique constraint covering the columns `[email,rollNumber]` on the table `EmailWithRoll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailWithRoll_email_rollNumber_key" ON "EmailWithRoll"("email", "rollNumber");
