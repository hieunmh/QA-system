<template>
  <div class="w-screen h-screen bg-white px-2 lg:px-20 py-5">
    <div class="w-full h-full flex space-x-10">
      <ScrollArea class="h-full w-full space-y-5">
        <div class="py-3 text-2xl font-semibold flex justify-between">
          <p>問題</p>
          <div class="space-x-3" v-if="!isEdit">
            <Icon @click="isEdit = true" name="material-symbols:edit-square-rounded" size="24" class="cursor-pointer" />
            <Icon name="ic:baseline-delete" size="24" class="cursor-pointer" />
          </div>

          <div v-else class="flex items-center justify-center">
            <button @click="editExam()" class="h-8 w-[60px] bg-common text-white rounded-md flex items-center justify-center">
              <Icon v-if="isLoading"name="icon-park-outline:loading-four" size="20" class="animate-spin"/>
              <p v-else class="text-sm">完成</p>
            </button>
          </div>
        </div>
        <div v-if="examsStore.exams?.length !== 0" v-for="question, index in exam?.questions" :key="index" 
          class="bg-white border w-full p-5 shadow-md space-y-2 rounded-md text-lg mb-5"
        >
          <p><span class="font-semibold">問題 {{ index + 1 }}:</span> {{  question.content }}</p>
          <div v-for="answer, id in question.answers" :key="id">
            <p :class="answer.is_correct && 'text-green-500'"><span class="font-semibold">{{ String.fromCharCode(id + 65) }}:</span> {{ answer.content }}</p>
          </div>
        </div>

        <div v-else class="space-y-5">
          <Skeleton class="w-full h-[150px] p-5 rounded-md shadow-md" />

          <Skeleton class="w-full h-[150px] p-5 rounded-md shadow-md" />

          <Skeleton class="w-full h-[150px] p-5 rounded-md shadow-md" />

          <Skeleton class="w-full h-[150px] p-5 rounded-md shadow-md" />
        </div>

      </ScrollArea>

      <ScrollArea class="w-[350px] h-full">
        <div class="pt-3 font-semibold text-2xl">
          やった人
        </div>

        <div class="w-full border-b py-3">
          <input type="text" class="w-full border-[1.5px] py-2 px-3 rounded-md" placeholder="検索" v-model="search">
        </div>
        <div v-if="examsStore.exams?.length !== 0">
          <div v-if="exam?.results && exam?.results.length > 0" :key="index" 
            v-for="result, index in exam?.results.filter(res => res.user.name.toLowerCase().includes(search.trim().toLowerCase()))"
            class="w-full p-5 space-y-2 border-b hover:bg-gray-50 cursor-pointer"
          >
            <Dialog>
              <DialogTrigger>
                <div class="h-full flex items-center justify-start space-x-2">
                  <img :src="`http://127.0.0.1:8000/${result.user?.image}`" 
                    alt="avatar" class="h-12 aspect-square rounded-full border"
                  >
                  <p class="font-normal">{{  result.user.name  }}</p>
                </div>   
                <p class="text-xl font-semibold">点: {{ result.score }}</p>   
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="text-center"></DialogTitle>
                  <DialogDescription class="font-semibold text-center">
                    {{ result.user.name }}さんの歴史 
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea class="w-full space-y-5 max-h-[500px]">
                  <div v-for="question, index in exam?.questions" :key="index" 
                    class="bg-white border w-full p-5 shadow-md space-y-2 rounded-md text-lg mb-5"
                  > 
                    <p><span class="font-semibold">問題 {{ index + 1 }}:</span> {{  question.content }}</p>
                    <div v-for="answer, id in question.answers" :key="id" class="flex items-center space-x-2" >
                      <Checkbox :checked="exam.histories.filter(h => h.user_id === result.user_id).find(h => h.question_id == question.id)?.answer_id === answer.id" />
                      <p :class="answer.is_correct ? 'text-green-500' : ''"><span class="font-semibold">
                        {{ String.fromCharCode(id + 65) }}:</span> {{ answer.content }}
                      </p>
                    </div>
                    <div v-if="exam.histories.filter(h => h.user_id === result.user_id).find(h => h.question_id === question.id)?.answer_id 
                      == question.answers.find(a => a.is_correct)?.id" class="font-semibold flex items-center justify-between"
                    >
                      <p>{{ (10 / exam.questions.length ).toFixed(2) }}点</p>
                      <Icon name="ph:circle-bold" size="20" class="text-green-500" />
                    </div>
                    <div v-else class="font-semibold flex items-center justify-between">
                      <p>0.00点</p>
                      <Icon name="gridicons:cross" size="20" class="text-rose-500" />
                    </div>
                  </div>
                </ScrollArea>

                <div class="flex justify-end font-semibold text-2xl">合計: {{ exam.results.find(e => e.user_id === result.user_id)?.score }}点</div>

                <DialogFooter>
                  <DialogClose>
                    <Button>閉じる</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div v-else class="w-full p-5 border-b text-xl cursor-pointer hover:bg-gray-50">
            このテストはまだ誰も受けていません。
          </div>
        </div>

        <div v-else>
          <Skeleton class="w-full h-[150px] p-5" />
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ScrollArea } from '~/components/ui/scroll-area';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import axiosClient from '~/lib/axios';
import { useExamsStore } from '~/stores/exams';
import { Scroll } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const examsStore = useExamsStore();
let exam = ref(examsStore.exams?.find(e => e.code === route.params.code));
let isEdit = ref(false);
let isLoading = ref(false);
let search = ref('');

const editExam = () => {
  isLoading.value = true;
}

onMounted(async () => {
  if (examsStore.exams?.length == 0) {
    await axiosClient.get('/api/exams').then(res => {
      examsStore.exams = res.data;
    });

    exam.value = examsStore.exams.find(e => e.code === route.params.code);
  }
})


</script>