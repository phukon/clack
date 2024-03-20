/*
  Warnings:

  - A unique constraint covering the columns `[stripe_payment_intent_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripePaymentDate" TIMESTAMP(3),
ADD COLUMN     "stripe_payment_intent_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripe_payment_intent_id_key" ON "User"("stripe_payment_intent_id");
