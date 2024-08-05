<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="w-screen bg-white h-20 flex items-center justify-between px-2 lg:px-20">
      <div class="flex space-x-2">
        <img src="/logo.png" alt="logo" class="h-[30px]" />
        <p class="font-bold text-common text-3xl">ピ</p>
      </div>

      <div class="flex space-x-2 items-center">
        <div v-if="userStore.user?.name" class="h-full flex items-center space-x-2">
          <p class="font-normal">{{  userStore.user?.name  }}</p>
          <img :src="`http://127.0.0.1:8000/${userStore.user?.image}`" 
            alt="avatar" class="h-12 w-12 aspect-square rounded-full border"
          >
        </div>
        <div v-else class="h-full flex items-center space-x-2">
          <Skeleton class="w-[150px] h-6" />
          <Skeleton class="h-12 w-12 aspect-square rounded-full" />
        </div>
      </div>
    </div>

    <div class="w-full h-full bg-[#fafafc] lg:px-20 px-2 flex space-x-5 py-5">
      <div class="w-[300px] h-full flex flex-col font-medium">
        <p>コード: {{ examStore.code }}</p>
        <p>主題: {{ examStore.subject }}</p>
        <p>時間: {{ examStore.time }} 分</p>
        <p>{{ min }} : {{ sec }}</p>

        <div class="w-full h-3 bg-gray-200 relative rounded-full">
          <div class="h-full absolute top-0 left-0 bg-green-500 rounded-full" :style="{ width: width + '%' }"></div>
        </div>
      </div>

      <div class="w-full space-y-5">
        <div v-for="question, index in examStore.questions" :key="index" class="bg-white rounded-md shadow-md w-full p-4 space-y-3">
          <span class="font-semibold">問題 {{ index + 1 }}</span>: {{ question.content }}
          <div v-for="answer, id in question.answers" :key="id" class=" space-x-2 flex items-center">
            <Checkbox />
            <span>{{  String.fromCharCode(id + 65) }}</span>. {{ answer.content }}
          </div>
        </div>
      </div>

      <div class="w-[300px] h-full bg-red-100">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: 'has-exam' });

import { useUserStore } from '~/stores/user';
import { useExamStore } from '~/stores/exam';
import { Skeleton } from '~/components/ui/skeleton';
import { Checkbox } from '~/components/ui/checkbox';

const userStore = useUserStore();
const examStore = useExamStore();

let time = ref(examStore.time * 60);
let min = ref(examStore.time.toString());
let sec = ref('00');

let width = ref(100);


onMounted(() => {
  setInterval(() => {
    time.value--;
    width.value = time.value /(examStore.time * 60) * 100
    min.value = Math.fround(time.value / 60) >= 10 ?  Math.floor(time.value / 60).toString() : '0' + Math.floor(time.value / 60);
    sec.value = time.value % 60 >= 10 ? (time.value % 60).toString() : '0' + (time.value % 60);
  }, 1000)
})

</script>