/*
  Warnings:

  - You are about to drop the column `exported` on the `news_detail` table. All the data in the column will be lost.
  - You are about to drop the column `updated_recently` on the `news_detail` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('UNEXPORTED', 'UPDATED_RECENTLY', 'EXPORTED');

-- AlterTable
ALTER TABLE "news_detail" DROP COLUMN "exported",
DROP COLUMN "updated_recently",
ADD COLUMN     "status" "NewsStatus" NOT NULL DEFAULT 'UNEXPORTED';
