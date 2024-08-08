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

    <Dialog :open="isOpenDialog">
      <DialogTrigger class="hidden">
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div class="flex justify-center flex-col items-center space-y-3">
              <p class="font-semibold">主題: {{ examStore.subject }}</p>
              <p class="text-sm">時間: {{ examStore.time }} 分</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Button @click="takeExam()">
          テストを受けます
        </Button>
      </DialogContent>
    </Dialog>

    <Dialog :open="examStore.openResult">
      <DialogTrigger class="hidden">
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="font-semibold text-center">
            <div v-if="resultStore.status === 200" class="flex justify-center flex-col items-center space-y-3 text-3xl">
              {{ resultStore.score }} 点
            </div>

            <div v-else>テストを受けました</div>
          </DialogTitle>
        </DialogHeader>

        <Button @click="examStore.openResult = false">
          閉じる
        </Button>
      </DialogContent>
    </Dialog>
    

  </StudentLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['is-logged-in', 'is-logged-out'] });
import { useUserStore } from '~/stores/user';
import { useExamStore } from '~/stores/exam';
import StudentLayout from '~/layouts/StudentLayout.vue'; 
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import axiosClient from '~/lib/axios';
import { toast } from 'vue-sonner';

const userStore = useUserStore();
const examStore = useExamStore();
const resultStore = useResultStore();
const value = ref<string[]>([]);
const router = useRouter();
const ex = useCookie('ex');

let isLoading = ref(false);
let codeError = ref('');
let isOpenDialog = ref(false);


watch(() => value.value, () => {
  if (value.value.length === 10) {
    codeError.value = '';
  }
});

const takeExam = async () => {
  router.push('/student/exam');

  await axiosClient.post('/api/result', {
    user_id: userStore.user?.id,
    exam_id: examStore.id,
    start_time: Date.now().toString(),
    end_time: (Date.now() + examStore.time * 60 * 1000).toString(),
    review: examStore.review,
    redo: examStore.redo
  })
}

const joinExam = async () => {
  if (value.value.length < 10) {
    codeError.value = '10 文字すべてを入力してください。'
    return;
  } else {
    codeError.value = '';
  }
  let code = '';
  value.value.forEach(c => code += c);
  isLoading.value = true;

  await axiosClient.get(`/api/exam/${code}`).then(res => {    
    isOpenDialog.value = true;
    
    examStore.id = res.data.data.id;
    examStore.code = res.data.data.code;
    examStore.subject = res.data.data.subject;
    examStore.time = res.data.data.time;
    examStore.questions = res.data.data.questions;
    examStore.redo = res.data.data.redo;
    examStore.review = res.data.data.review;
    ex.value = res.data.data.code;

  }).catch(err => {
    toast.error('テストが見つかりません。');
  }).finally(() => {
    isLoading.value = false;
  })
}

</script>