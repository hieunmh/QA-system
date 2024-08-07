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

    <div class="w-full h-[calc(100%-80px)] bg-[#fafafc] lg:px-20 px-2 flex space-x-5 py-5">
      <div v-if="min == '00' && sec == '00'" class="w-[300px] h-full flex flex-col font-medium">
        <Skeleton class="h-24" />
      </div>

      <div v-else class="w-[300px] h-full flex flex-col font-medium">
        <p>コード: {{ examStore.code }}</p>
        <p>主題: {{ examStore.subject }}</p>
        <p>時間: {{ examStore.time }} 分</p>
        <p>{{ min }} : {{ sec }}</p>

        <div class="w-full h-3 bg-gray-200 relative rounded-full">
          <div class="h-full absolute top-0 left-0 bg-green-500 rounded-full" :style="{ width: width + '%' }"></div>
        </div>
      </div>

      <div class="w-full h-[calc(100%-50px)]">
        <ScrollArea class="w-full h-full overflow-y-scroll px-4">
          <div v-for="question, index in examStore.questions" :key="index" :id="(index + 1).toString()" class="bg-white rounded-md shadow-md w-full p-4 space-y-3 mb-5">
            <span class="font-semibold">問題 {{ index + 1 }}</span>: {{ question.content }}
            <div v-for="answer, id in question.answers" :key="id" class=" space-x-2 flex items-center">
              <input @click="selectAnswer((index + 1).toString(), answer.id || '')" :id="answer.id" type="checkbox" class="h-4 w-4 rounded-full bg-red-300">
              <span>{{  String.fromCharCode(id + 65) }}</span>. {{ answer.content }}
            </div>
          </div>
        </ScrollArea>

        <div class="w-full flex items-center justify-center">
          
          <Button @click="submitExam()" class="w-[200px] bg-common border-[1.5px] border-common hover:bg-white hover:text-common flex items-center justify-center">
            <Icon v-if="isLoading"name="icon-park-outline:loading-four" size="20" class="animate-spin"/>
            <p v-else>提出</p>
          </Button>
        </div>
      </div>

      <div class="w-[300px] h-full grid grid-cols-3 gap-3">
        <a :href="'#' + (index + 1).toString()" v-for="item, index in examStore.questions" :key="index" :id="'tag' + (index + 1).toString()"
          class="w-full aspect-square flex items-center justify-center text-center border-[1.5px] rounded-lg font-semibold"
        >
          {{ index + 1 }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['has-exam'] });
import { useUserStore } from '~/stores/user';
import { useExamStore } from '~/stores/exam';
import { Skeleton } from '~/components/ui/skeleton';
import axiosClient from '~/lib/axios';
import { toast } from 'vue-sonner';

const userStore = useUserStore();
const examStore = useExamStore();
const resultStore = useResultStore();
const ex = useCookie('ex');
const router = useRouter();

let time = ref(examStore.time * 60);
let min = ref(examStore.time <= 10 ? '0' + examStore.time : examStore.time.toString());
let sec = ref('00');

let width = ref(100);
let isLoading = ref(false);
let answerIds = ref<string[]>([]);

onMounted(async () => {

  if (!examStore.id) {
    const res = (await axiosClient.get(`/api/exam/${ex.value}`)).data.data;
    examStore.id = res.id;
    examStore.code = res.code;
    examStore.subject = res.subject;
    examStore.time = res.time;
    examStore.questions = res.questions;
    examStore.redo = res.redo;
    examStore.review = res.review;
  };

  const a = await axiosClient.get(`/api/result/${userStore.user?.id}/${examStore.id}`);  
  
  setInterval(() => {
    time.value = Math.floor((parseInt(a.data.end_time) - Date.now()) / 1000);

    if (time.value === 0) {
      submitExam();
      return;
    };
    time.value--;
    width.value = time.value /(examStore.time * 60) * 100
    min.value = Math.fround(time.value / 60) >= 10 ?  Math.floor(time.value / 60).toString() : '0' + Math.floor(time.value / 60);
    sec.value = time.value % 60 >= 10 ? (time.value % 60).toString() : '0' + (time.value % 60);
  }, 1000);
});

const selectAnswer = (id: string, answerId: string) => {
  let tag = document.getElementById(`tag${id}`);  

  let question = document.getElementById(id);
  let checkbox = question?.querySelectorAll('input');

  checkbox?.forEach(c => {  
    if (c.id !== answerId) {
      c.checked = false;
    }
  });

  let checked = question?.querySelectorAll('input:checked');

  if (checked?.length && checked.length > 0) tag?.classList.add('bg-common', 'text-white')
  else tag?.classList.remove('bg-common', 'text-white')
}

const submitExam = async () => {
  ex.value = null;
  const answers = document.querySelectorAll('input:checked');
  answerIds.value = [];
  answers.forEach(a => answerIds.value.push(a.id));

  if (time.value !== 0 && answerIds.value.length < examStore.questions.length) {
    toast.error('質問の完全な回答を記入してください。');
    return;
  }

  isLoading.value = true;
  await axiosClient.patch('/api/result', {
    user_id: userStore.user?.id,
    exam_id: examStore.id,
    answers: answerIds.value,
    quantity: examStore.questions.length
  }).then((res) => {
    router.push('/student');
    examStore.openResult = true;    
    
    if (res.status === 200) {
      resultStore.score = res.data.data;
      resultStore.status = res.data.status
    }
    
  }).catch(err => {


  }).finally(() => {
    isLoading.value = false;
  })
}

</script>