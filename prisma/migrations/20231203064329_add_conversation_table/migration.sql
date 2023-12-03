-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "creationDate" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);
