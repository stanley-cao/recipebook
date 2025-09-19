/*
  Warnings:

  - You are about to drop the column `estimatedHours` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "estimatedHours",
ADD COLUMN     "estimatedMinutes" INTEGER;
