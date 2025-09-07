/*
  Warnings:

  - A unique constraint covering the columns `[heroSectionId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "HeroSection_storeId_key";

-- AlterTable
ALTER TABLE "HeroSection" ADD COLUMN "ctaLink" TEXT;
ALTER TABLE "HeroSection" ADD COLUMN "ctaText" TEXT;
ALTER TABLE "HeroSection" ADD COLUMN "subtitle" TEXT;
ALTER TABLE "HeroSection" ADD COLUMN "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Media_heroSectionId_key" ON "Media"("heroSectionId");
