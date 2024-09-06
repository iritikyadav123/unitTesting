-- CreateEnum
CREATE TYPE "calType" AS ENUM ('sum', 'mul');

-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "type" "calType" NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);
