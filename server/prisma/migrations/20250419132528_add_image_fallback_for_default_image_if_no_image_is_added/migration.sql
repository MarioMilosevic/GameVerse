/*
  Warnings:

  - The `image` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageFallback" TEXT NOT NULL DEFAULT 'https://social-network-js.vercel.app/img/profile5.png',
DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;
