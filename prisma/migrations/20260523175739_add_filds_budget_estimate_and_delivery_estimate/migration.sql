/*
  Warnings:

  - Added the required column `budgetEstimate` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryEstimate` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "budgetEstimate" TEXT NOT NULL,
ADD COLUMN     "deliveryEstimate" TEXT NOT NULL;
