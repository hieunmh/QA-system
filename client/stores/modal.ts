import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpenExamForm: false,
    isOpenQuestionForm: false
  })
})