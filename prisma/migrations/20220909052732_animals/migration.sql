-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);
