import { defineStore } from "pinia";
import randomString from "random-string";

export const useExamStore = defineStore('exam', {
  state: () => ({
    code: randomString({ length: 10 }),
    subject: '数学',
    time: 1,
    review: 'true',
    redo: 'true'
  })
})