/*
  Warnings:

  - Changed the type of `email` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
ADD COLUMN     "email" TEXT NOT NULL;
