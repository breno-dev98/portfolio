-- DropForeignKey
ALTER TABLE "checklist" DROP CONSTRAINT "checklist_projectId_fkey";

-- DropForeignKey
ALTER TABLE "document" DROP CONSTRAINT "document_projectId_fkey";

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist" ADD CONSTRAINT "checklist_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
