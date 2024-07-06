-- CreateTable
CREATE TABLE "mypage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "status" "NewsStatus" NOT NULL DEFAULT 'UNEXPORTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mypage_pkey" PRIMARY KEY ("id")
);
