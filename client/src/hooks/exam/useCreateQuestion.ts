import { create } from "zustand";
import { QuestionType } from "@/types/type";

interface useCreateQuestionType {
  questions: QuestionType[],
  setQuestions: (questions: QuestionType[]) => void
}

export const useCreateQuestion = create<useCreateQuestionType>(set => ({
  questions: [],
  setQuestions: (questions: QuestionType[]) => set({ questions })
}));