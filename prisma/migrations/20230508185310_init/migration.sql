-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "todoTitle" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "todoMessage" TEXT,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
