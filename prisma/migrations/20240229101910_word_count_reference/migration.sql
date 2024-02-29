/*
  Warnings:

  - Made the column `wordCountRef` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "wordCountRef" SET NOT NULL,
ALTER COLUMN "wordCountRef" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Year" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;
