-- DropForeignKey
ALTER TABLE "Year" DROP CONSTRAINT "Year_userId_fkey";

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
