/*
  Warnings:

  - Added the required column `imageUrl` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artwork" ADD COLUMN     "imageUrl" TEXT NOT NULL;
