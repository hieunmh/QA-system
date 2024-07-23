import { create } from "zustand";

interface useCreateExamType {
  code: string;
  time: number;
  redo: boolean,
  review: boolean;
  setCode: (code: string) => void;
  setTime: (time: number) =>void;
  setRedo: (redo: boolean) => void;
  setReview: (review: boolean) => void;
}

export const useCreateExam = create<useCreateExamType>(set => ({
  code: '',
  time: 1,
  redo: true,
  review: true,
  setCode: (code: string) => set({ code }),
  setTime: (time: number) => set({ time }),
  setRedo: (redo: boolean) => set({ redo }),
  setReview: (review: boolean) => set({ review }),
}));