/*
  Warnings:

  - You are about to drop the column `referenceUrl` on the `project` table. All the data in the column will be lost.
  - Added the required column `references` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "referenceUrl",
ADD COLUMN     "references" TEXT NOT NULL;
