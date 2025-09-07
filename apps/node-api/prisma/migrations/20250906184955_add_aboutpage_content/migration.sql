-- RedefineTables
PRAGMA defer_foreign_keys = ON;

PRAGMA foreign_keys = OFF;

CREATE TABLE "new_AboutPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storeId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AboutPage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_AboutPage" ("content", "createdAt", "id", "storeId", "title", "updatedAt") SELECT coalesce("content", {}) AS "content", "createdAt", "id", "storeId", "title", "updatedAt" FROM "AboutPage";

DROP TABLE "AboutPage";

ALTER TABLE "new_AboutPage" RENAME TO "AboutPage";

CREATE UNIQUE INDEX "AboutPage_storeId_key" ON "AboutPage" ("storeId");

PRAGMA foreign_keys = ON;

PRAGMA defer_foreign_keys = OFF;