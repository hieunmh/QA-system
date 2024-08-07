import { useExamStore } from "~/stores/exam";

export default defineNuxtRouteMiddleware((to, from) => {
  const ex = useCookie('ex');
  if (!ex.value) {
    return navigateTo('/student');
  }
})