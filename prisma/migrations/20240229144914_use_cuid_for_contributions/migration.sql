/*
  Warnings:

  - The primary key for the `Contribution` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contribution_id_seq";
