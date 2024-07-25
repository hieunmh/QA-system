import { create } from "zustand";
import randomstring from 'randomstring';

interface useCreateExamType {
  code: string;
  time: number;
  redo: boolean,
  review: boolean;
  subject: string;
  setCode: (code: string) => void;
  setTime: (time: number) =>void;
  setRedo: (redo: boolean) => void;
  setReview: (review: boolean) => void;
  setSubject: (subject: string) => void;
}

export const useCreateExam = create<useCreateExamType>(set => ({
  code: randomstring.generate({ length: 10, charset: ['alphanumeric'] }),
  time: 1,
  redo: true,
  review: true,
  subject: '数学',
  setCode: (code: string) => set({ code }),
  setTime: (time: number) => set({ time }),
  setRedo: (redo: boolean) => set({ redo }),
  setReview: (review: boolean) => set({ review }),
  setSubject: (subject: string) => set ({ subject })
}));