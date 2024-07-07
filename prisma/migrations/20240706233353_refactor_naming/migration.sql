/*
  Warnings:

  - The `status` column on the `mypage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNEXPORTED', 'UPDATED_RECENTLY', 'EXPORTED');

-- DropForeignKey
ALTER TABLE "news_detail" DROP CONSTRAINT "news_detail_category_id_fkey";

-- AlterTable
ALTER TABLE "mypage" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNEXPORTED';

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "news_detail";

-- DropEnum
DROP TYPE "NewsStatus";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "quote" TEXT,
    "status" "Status" NOT NULL DEFAULT 'UNEXPORTED',
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
