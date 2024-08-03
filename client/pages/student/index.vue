<template>
  <StudentLayout>
    <div v-if="userStore.user" class="bg-[#fafafc] h-full w-full flex flex-col items-center justify-center space-y-2">
      <p class="font-semibold text-3xl"><span class="text-common">ピ</span>へようこそ、{{ userStore.user?.name }}</p>
      <p class="font-semibold text-xl text-gray-400">テストに参加するにはコードを入力してください。</p>
      <PinInput
        id="pin-input"
        v-model="value"
        placeholder="○"
      >
        <PinInputGroup class="">
          <PinInputInput :disabled="isLoading" :class="codeError ? 'border-rose-500 focus:ring-rose-500 placeholder:text-rose-500' : ''"
            v-for="(id, index) in 10"
            :key="id"
            :index="index"
          />
        </PinInputGroup>
      </PinInput>

      <p class="h-4 text-rose-500 text-sm font-semibold">{{ codeError }}</p>

      <Button variant="outline" class="w-[150px]" @click="joinExam()">
        <Icon v-if="isLoading"name="icon-park-outline:loading-four" size="24" class="animate-spin"/>
        <p v-else>参加</p>
      </Button>
    </div>

    <div v-else class="bg-[#fafafc] h-full w-full flex flex-col items-center justify-center space-y-2">
      <Skeleton class="w-[336px] h-9" />
      <Skeleton class="w-[432px] h-7" />
      <Skeleton class="w-[400px] h-10" />
      <p class="h-4"></p>
      <Skeleton class="w-[150px] h-10" />
    </div>
  </StudentLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['is-logged-in', 'is-logged-out'] });
import { useUserStore } from '~/stores/user';
import StudentLayout from '~/layouts/StudentLayout.vue'; 
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '~/components/ui/button';

const userStore = useUserStore();
const value = ref<string[]>([]);
let isLoading = ref(false);
let codeError = ref('');

watch(() => value.value, () => {
  if (value.value.length === 10) {
    codeError.value = '';
  }
})

const joinExam = () => {
  if (value.value.length < 10) {
    codeError.value = '10 文字すべてを入力してください。'
    return;
  } else {
    codeError.value = '';
  }
  let code = '';
  value.value.forEach(c => code += c);
  isLoading.value = true;
  
}

</script>