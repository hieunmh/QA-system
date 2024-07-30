import { defineStore } from "pinia";
import type { UserType } from "~/types/type";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as UserType | null
    }
  }
})