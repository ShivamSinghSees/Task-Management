-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "deadline" DROP NOT NULL;
