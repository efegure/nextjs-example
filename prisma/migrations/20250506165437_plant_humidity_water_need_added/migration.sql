/*
  Warnings:

  - Added the required column `expectedHumidty` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyWaterNeedML` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "expectedHumidty" INTEGER NOT NULL,
ADD COLUMN     "weeklyWaterNeedML" INTEGER NOT NULL,
ALTER COLUMN "type" SET NOT NULL;
