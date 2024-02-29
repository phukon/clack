/*
  Warnings:

  - Made the column `start_date` on table `Year` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end_date` on table `Year` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "contribution_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Year" ALTER COLUMN "start_date" SET NOT NULL,
ALTER COLUMN "end_date" SET NOT NULL;
