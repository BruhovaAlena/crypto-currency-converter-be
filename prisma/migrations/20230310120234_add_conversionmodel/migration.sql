-- CreateTable
CREATE TABLE "Conversion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amountOfUsd" INTEGER NOT NULL,
    "cryptoCurrency" TEXT NOT NULL,
    "amountOfCryptoCurrency" INTEGER NOT NULL,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);
