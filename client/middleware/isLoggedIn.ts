export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('XSRF-TOKEN');
  const role = useCookie('r');

  if (token.value && (to.fullPath === '/signin' || to.fullPath === '/signup' || to.fullPath === '/')) {
    if (role.value === 'teacher') return navigateTo('/dashboard');
    else if (role.value === 'student') return navigateTo('/student');
  }

  if (token.value && role.value === 'student' && to.fullPath.includes('/dashboard')) {
    return navigateTo('/student');
  }

  if (token.value && role.value === 'teacher' && to.fullPath.includes('/student')) {
    return navigateTo('/dashboard');
  }
})