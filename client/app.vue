<template>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import axiosClient from './lib/axios';
import { useUserStore } from './stores/user';

const token = useCookie('XSRF-TOKEN');
const userStore = useUserStore();

onMounted(async () => {
  if (token.value) {
    await axiosClient.get('/api/user').then(res => {
      userStore.user = res.data;
    })
  }
})
</script>