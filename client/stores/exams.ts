import { defineStore } from "pinia";
import type { ExamType } from "~/types/type";

export const useExamsStore = defineStore('exams', {
  state: () => ({
    exams: [] as ExamType[] | null
  })
})