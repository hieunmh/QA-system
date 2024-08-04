import { defineStore } from "pinia";
import randomString from "random-string";
import type { QuestionType } from "~/types/type";

export const useExamStore = defineStore('exam', {
  state: () => ({
    code: randomString({ length: 10 }),
    subject: '',
    time: 1,
    review: 'true',
    redo: 'true',
    questions: [] as QuestionType[]
  })
})