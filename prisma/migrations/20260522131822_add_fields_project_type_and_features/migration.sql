/*
  Warnings:

  - Added the required column `projectType` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "customer_email_key";

-- DropIndex
DROP INDEX "customer_userId_key";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "features" TEXT[],
ADD COLUMN     "projectType" TEXT NOT NULL;
