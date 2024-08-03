export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('XSRF-TOKEN');

  if (!token.value && (to.fullPath.includes('/dashboard') || to.fullPath.includes('/student'))) {
    return navigateTo('/');
  }
})