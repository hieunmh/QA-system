import { defineStore } from "pinia";
import randomString from "random-string";
import type { QuestionType } from "~/types/type";

export const useExamStore = defineStore('exam', {
  state: () => ({
    code: '',
    subject: '',
    time: 10,
    review: 'true',
    redo: 'true',
    questions: [] as QuestionType[]
  })
})