import { useExamStore } from "~/stores/exam";

export default defineNuxtRouteMiddleware((to, from) => {
  const examStore = useExamStore();
  if (!examStore.code) {
    return navigateTo('/student');
  }
})