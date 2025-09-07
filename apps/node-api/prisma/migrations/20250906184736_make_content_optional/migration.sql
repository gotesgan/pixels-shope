/*
  Warnings:

  - You are about to drop the `AboutCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AboutSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrandItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyFact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FactItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OurBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `aboutCompanyId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `aboutSectionId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `companyFactId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `ourBrandId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `sectionItemId` on the `Media` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AboutCompany_aboutPageId_key";

-- DropIndex
DROP INDEX "CompanyFact_aboutPageId_key";

-- DropIndex
DROP INDEX "OurBrand_aboutPageId_key";

-- AlterTable
ALTER TABLE "AboutPage" ADD COLUMN "content" JSONB;
ALTER TABLE "AboutPage" ADD COLUMN "title" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AboutCompany";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AboutSection";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BrandItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CompanyFact";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FactItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OurBrand";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SectionItem";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "storeId" TEXT,
    "heroSectionId" TEXT,
    "storeInfoId" TEXT,
    "blogId" TEXT,
    "aboutPageId" TEXT,
    CONSTRAINT "Media_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_heroSectionId_fkey" FOREIGN KEY ("heroSectionId") REFERENCES "HeroSection" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_storeInfoId_fkey" FOREIGN KEY ("storeInfoId") REFERENCES "StoreInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_aboutPageId_fkey" FOREIGN KEY ("aboutPageId") REFERENCES "AboutPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("blogId", "heroSectionId", "id", "image", "storeId", "storeInfoId") SELECT "blogId", "heroSectionId", "id", "image", "storeId", "storeInfoId" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE UNIQUE INDEX "Media_heroSectionId_key" ON "Media"("heroSectionId");
CREATE UNIQUE INDEX "Media_storeInfoId_key" ON "Media"("storeInfoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
