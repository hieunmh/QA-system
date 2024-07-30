export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('XSRF-TOKEN');

  if (token.value && (to.fullPath === '/signin' || to.fullPath === '/signup' || to.fullPath === '/')) {
    return navigateTo('/dashboard');
  }
})