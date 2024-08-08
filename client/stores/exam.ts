import { defineStore } from "pinia";
import randomString from "random-string";
import type { QuestionType, ResultType } from "~/types/type";

export const useExamStore = defineStore('exam', {
  state: () => ({
    id: '',
    code: randomString({ length: 10 }),
    subject: '数学',
    time: 0,
    review: 'true',
    redo: 'true',
    questions: [] as QuestionType[],
    openResult: false,
    results: [] as ResultType[]
  })
})