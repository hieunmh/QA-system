import { ExamType } from "@/types/type";
import { create } from "zustand";

interface useExamType {
  exam: ExamType | null;
  exams: ExamType[];
  setExam: (exam: ExamType) => void;
  setExams: (exams: ExamType[]) => void;
}

export const useExam = create<useExamType>(set =>({
  exam: null,
  exams: [],
  setExam: (exam: ExamType) => set({ exam }),
  setExams: (exams: ExamType[]) => set({ exams })
}));