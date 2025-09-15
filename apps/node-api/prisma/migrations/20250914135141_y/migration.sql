/*
  Warnings:

  - Added the required column `isActive` to the `Razorpay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Razorpay" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
