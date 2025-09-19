/*
  Warnings:

  - You are about to drop the column `authorId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeTag" DROP CONSTRAINT "RecipeTag_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeTag" DROP CONSTRAINT "RecipeTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "authorId",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."Comment";

-- DropTable
DROP TABLE "public"."Like";

-- DropTable
DROP TABLE "public"."RecipeTag";

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."User";

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "public"."Recipe"("slug");

-- AddForeignKey
ALTER TABLE "public"."Step" ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
