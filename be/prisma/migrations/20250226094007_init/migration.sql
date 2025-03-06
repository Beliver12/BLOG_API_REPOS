/*
  Warnings:

  - Added the required column `createdBy` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdBy" TEXT NOT NULL;
