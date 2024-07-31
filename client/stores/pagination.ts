import { defineStore } from "pinia";

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    allPageNumber: 0,
    currentPage: 1,
    perPage: null as number | null
  })
})