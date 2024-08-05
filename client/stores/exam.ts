import { defineStore } from "pinia";
import randomString from "random-string";
import type { QuestionType } from "~/types/type";

export const useExamStore = defineStore('exam', {
  state: () => ({
    id: '',
    code: '',
    subject: '',
    time: 0,
    review: 'true',
    redo: 'true',
    questions: [] as QuestionType[]
  })
})