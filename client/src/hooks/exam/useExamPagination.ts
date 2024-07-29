import { create } from "zustand";

interface ExamPaginationType {
  page: number,
  perPage: number;
  pageNumber: number;
  setPage: (page: number) => void;
  setPageNumber: (pageNumber: number) => void;
}


export const useExamPagination = create<ExamPaginationType>(set => ({
  page: 1,
  perPage: 2,
  pageNumber: 1,
  setPage: (page: number) => set({ page }),
  setPageNumber: (pageNumber: number) => set({ pageNumber })
}));