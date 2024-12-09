-- CreateTable
CREATE TABLE "Map" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "long" REAL NOT NULL,
    "lat" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "LocationData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "point_id" INTEGER NOT NULL,
    "map_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LocationDataImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_id" INTEGER NOT NULL,
    "location_data_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "alt" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");
