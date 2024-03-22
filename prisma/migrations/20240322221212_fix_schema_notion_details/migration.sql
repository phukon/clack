/*
  Warnings:

  - You are about to drop the column `notionDetails` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "notionDetails";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notionDetails" JSONB;
