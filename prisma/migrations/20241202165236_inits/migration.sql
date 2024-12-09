-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LocationDataImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_id" INTEGER NOT NULL,
    "location_data_id" INTEGER NOT NULL,
    CONSTRAINT "LocationDataImage_location_data_id_fkey" FOREIGN KEY ("location_data_id") REFERENCES "LocationData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LocationDataImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationDataImage" ("id", "image_id", "location_data_id") SELECT "id", "image_id", "location_data_id" FROM "LocationDataImage";
DROP TABLE "LocationDataImage";
ALTER TABLE "new_LocationDataImage" RENAME TO "LocationDataImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
