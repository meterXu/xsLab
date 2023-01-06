/*
  Warnings:

  - You are about to alter the column `data` on the `xs_canvas` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `Text`.

*/
-- AlterTable
ALTER TABLE `xs_canvas` MODIFY `data` TEXT NOT NULL;
