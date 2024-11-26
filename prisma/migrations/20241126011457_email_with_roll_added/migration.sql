-- CreateTable
CREATE TABLE "EmailWithRoll" (
    "email" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailWithRoll_email_key" ON "EmailWithRoll"("email");
