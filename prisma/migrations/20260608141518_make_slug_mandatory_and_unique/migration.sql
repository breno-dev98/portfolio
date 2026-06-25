/*
  Warnings:

  - A unique constraint covering the columns `[customerId,slug]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_customerId_slug_key" ON "project"("customerId", "slug");
