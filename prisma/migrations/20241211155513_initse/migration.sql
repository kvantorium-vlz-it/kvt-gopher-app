-- CreateTable
CREATE TABLE "Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,
    CONSTRAINT "QuizQuestion_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuizQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "is_true" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "AnswerQwestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer_id" INTEGER NOT NULL,
    CONSTRAINT "AnswerQwestion_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
