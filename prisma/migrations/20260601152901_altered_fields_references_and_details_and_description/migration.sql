/*
  Warnings:

  - Made the column `description` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `details` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "details" SET NOT NULL,
ALTER COLUMN "references" DROP NOT NULL;
