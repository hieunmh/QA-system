<template>
  <div class="w-screen h-screen flex">
    <LeftSidebar />

    <div class="flex flex-col w-full">
      <div class="w-full h-[88px] bg-white p-5 flex justify-between">
        <div class="flex items-center h-full border-[1.5px] rounded-md border-gray-300 w-[400px]">
          <input type="text" class="outline-none px-2 w-full" placeholder="検索するには入力してください。">
          <button @click="searching()" class="rounded-r w-[80px] h-full flex items-center border-l justify-center hover:bg-gray-100">
            <Icon v-if="isLoading" size="22" name="icon-park-outline:loading-four" class="text-black animate-spin" />
            <p v-else class="text-black font-semibold">検索</p>
          </button>
        </div>

        <div class="">
          <div v-if="userStore.user?.name" class="h-full flex items-center space-x-2">
            <p class="font-normal">{{  userStore.user?.name  }}</p>
            <img :src="`http://127.0.0.1:8000/${userStore.user?.image}`" 
              alt="avatar" class="h-full aspect-square rounded-full border"
            >
          </div>
          <div v-else class="h-full flex items-center space-x-2">
            <Skeleton class="w-[150px] h-6" />
            <Skeleton class="h-12 w-12 aspect-square rounded-full" />
          </div>
        </div>
      </div> 
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components';
import { Skeleton } from '@/components/ui/skeleton';
import axiosClient from '~/lib/axios';
import { useUserStore } from '~/stores/user';
import { useExamsStore } from '~/stores/exams';


let isLoading = ref(false);

const userStore = useUserStore();
const examsStore = useExamsStore();

const searching = async () => {
  isLoading.value = true;
}

onMounted(async () => {
  if (examsStore.exams?.length == 0) {
    await axiosClient.get('/api/exams').then(res => {
      examsStore.exams = res.data;
    })
  }
})

</script>