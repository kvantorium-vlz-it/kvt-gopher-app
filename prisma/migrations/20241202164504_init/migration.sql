-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LocationData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "point_id" INTEGER NOT NULL,
    "map_id" INTEGER NOT NULL,
    CONSTRAINT "LocationData_point_id_fkey" FOREIGN KEY ("point_id") REFERENCES "Point" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LocationData_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationData" ("description", "id", "map_id", "name", "point_id") SELECT "description", "id", "map_id", "name", "point_id" FROM "LocationData";
DROP TABLE "LocationData";
ALTER TABLE "new_LocationData" RENAME TO "LocationData";
CREATE TABLE "new_LocationDataImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_id" INTEGER NOT NULL,
    "location_data_id" INTEGER NOT NULL,
    CONSTRAINT "LocationDataImage_location_data_id_fkey" FOREIGN KEY ("location_data_id") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationDataImage" ("id", "image_id", "location_data_id") SELECT "id", "image_id", "location_data_id" FROM "LocationDataImage";
DROP TABLE "LocationDataImage";
ALTER TABLE "new_LocationDataImage" RENAME TO "LocationDataImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
