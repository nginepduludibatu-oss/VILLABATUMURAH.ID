-- CreateTable
CREATE TABLE "villas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "travelokaUrl" TEXT,
    "googleMapsEmbedUrl" TEXT,
    "googleMapsShareUrl" TEXT,
    "customUrl" TEXT,
    "basePrice" REAL NOT NULL,
    "weekendPrice" REAL,
    "discountPercent" REAL NOT NULL DEFAULT 0,
    "discountThresholdNights" INTEGER,
    "customBadge" TEXT,
    "capacity" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "totalUnits" INTEGER NOT NULL DEFAULT 1,
    "checkInTime" TEXT NOT NULL DEFAULT '14:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '12:00',
    "images" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "houseRules" TEXT,
    "nearbyAttractions" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL NOT NULL DEFAULT 4.9,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "cs_whatsapp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteTitle" TEXT NOT NULL DEFAULT 'VillaBatuMurah.ID',
    "primaryColor" TEXT NOT NULL DEFAULT '#0194f3',
    "defaultWA" TEXT NOT NULL,
    "globalDiscountNotice" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "villas_slug_key" ON "villas"("slug");
