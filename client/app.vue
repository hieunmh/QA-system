<template>
    <NuxtLayout>
      <Toaster position="top-center" rich-colors expand />
      <NuxtPage/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import axiosClient from './lib/axios';
import { useUserStore } from './stores/user';
import { Toaster } from 'vue-sonner';

const token = useCookie('XSRF-TOKEN');
const userStore = useUserStore();

onBeforeMount(async () => {
  if (token.value) {
    await axiosClient.get('/api/user').then(res => {
      userStore.user = res.data;
    })
  }
})
</script>