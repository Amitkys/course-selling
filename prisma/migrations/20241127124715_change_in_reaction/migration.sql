/*
  Warnings:

  - You are about to drop the column `type` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `dislikeStatus` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeStatus` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "type",
ADD COLUMN     "dislikeStatus" BOOLEAN NOT NULL,
ADD COLUMN     "likeStatus" BOOLEAN NOT NULL;
