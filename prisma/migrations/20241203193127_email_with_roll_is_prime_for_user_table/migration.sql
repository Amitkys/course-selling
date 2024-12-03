-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "EmailWithRoll"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
