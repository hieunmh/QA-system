import { defineStore } from "pinia";

export const useResultStore = defineStore('result', {
  state: () => ({
    status: 0,
    score: ''
  })
})