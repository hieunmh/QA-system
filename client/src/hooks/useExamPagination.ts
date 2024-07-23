import { create } from "zustand";

interface ExamPaginationType {
  page: number,
  perPage: number;
  pageNumber: number;
  setPage: (page: number) => void
}


export const useExamPagination = create<ExamPaginationType>(set => ({
  page: 1,
  perPage: 3,
  pageNumber:2,
  setPage: (page: number) => set({ page })
}));