/*
  Warnings:

  - Added the required column `qwestion_id` to the `AnswerQwestion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnswerQwestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer_id" INTEGER NOT NULL,
    "qwestion_id" INTEGER NOT NULL,
    CONSTRAINT "AnswerQwestion_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnswerQwestion" ("answer_id", "id") SELECT "answer_id", "id" FROM "AnswerQwestion";
DROP TABLE "AnswerQwestion";
ALTER TABLE "new_AnswerQwestion" RENAME TO "AnswerQwestion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
