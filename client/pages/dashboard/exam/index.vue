<template>
  <DashboardLayout>
    <div class="w-full h-full px-5 py-3 bg-[#fafafc]">
      <div class="w-full h-full space-y-4">
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold">テスト</p>
          <ExamCreateButton />

          <Dialog :open="modalStore.isOpenQuestionForm">
            <DialogTrigger class="hidden">
            </DialogTrigger>
            <DialogContent class="bg-[#f6f5ff] border-0 m-0 gap-0">
              <DialogHeader>
                <DialogTitle class="text-center">コード: {{ examStore.code }}</DialogTitle>
                <DialogDescription>
                  
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea class="max-h-[600px] px-4 pb-4">
                <div v-for="item, index in questionQuantity" :key="index" class="w-full">
                  <ExamCreateQuestion :class="item === 0 && 'hidden h-0'" v-show="item === 1" :id="index" :visible="item" :remove="removeQuestion" />
                </div>
              </ScrollArea>

              <div class="w-full flex justify-between items-center">
                <button @click="addQuestion()" class="flex items-center font-semibold space-x-1 hover:underline">
                  <Icon name="material-symbols:add-circle-outline-rounded" size="24" />
                  <p>質問を追加</p>
                </button>
                <div class="flex space-x-2">
                  <Button variant="outline" @click="backModel()" class="w-[80px]">戻す</Button>
                  <Button @click="submitExam()" class="w-[80px]">
                    <Icon v-if="isLoading" name="icon-park-outline:loading-four" size="20" class="animate-spin" />
                    <p v-else>作成</p>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div class="w-full h-[calc(100%-128px)] bg-white shadow-lg border rounded-md p-5">
          <div class="grid grid-cols-12 font-semibold pb-5">
            <div class="col-span-2 text-center">番</div>
            <div class="col-span-2 text-center">宿題</div>
            <div class="col-span-2 text-center">コード</div>
            <div class="col-span-2 text-center">質問数</div>
            <div class="col-span-2 text-center">やった人</div>
            <div class="col-span-2 text-center">時間(分)</div>
          </div>
          
          <NuxtLink :to="`/dashboard/exam/${exam.code}`" v-for="(exam, index) in examsStore.exams" :key="index" class="grid grid-cols-12 font-normal py-5 hover:bg-gray-50 border-t">
            <div class="col-span-2 text-center">{{ index + 1 }}</div>
            <div class="col-span-2 text-center">{{ exam.subject }}</div>
            <div class="col-span-2 text-center">{{ exam.code }}</div>
            <div class="col-span-2 text-center">{{  exam.questions.length }}</div>
            <div class="col-span-2 text-center">123</div>
            <div class="col-span-2 text-center">{{ exam.time }}</div>
          </NuxtLink> 
        </div>

        <div class="w-full flex items-center justify-center">
          <Pagination v-slot="{ page }" :total="examsStore.exams!.length * 10" :sibling-count="1" show-edges :default-page="1">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />
              <template v-for="(item, index) in items" :key="index">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                  <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>
              <PaginationNext />
              <PaginationLast />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'is-logged-out' });

import DashboardLayout from '~/layouts/DashboardLayout.vue';
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; 
import { useModalStore } from '~/stores/modal';
import { useExamStore } from '~/stores/exam';
import { useExamsStore } from '~/stores/exams';
import { useUserStore } from '~/stores/user';
import type { QuestionType } from '~/types/type';
import axiosClient from '~/lib/axios';
import { toast } from 'vue-sonner';

const modalStore = useModalStore();
const examStore = useExamStore();
const examsStore = useExamsStore();
const userStore = useUserStore();

let questionQuantity = ref([1]);
let questionsList = ref<QuestionType[]>([]);
let isLoading = ref(false);

const addQuestion = () => {
  questionQuantity.value.push(1);
}

const removeQuestion = (index: number) => {
  let visibleQuetion = questionQuantity.value.filter(value => value === 1).length;

  if (visibleQuetion === 1) return;

  questionQuantity.value[index] = 0;  
}

const backModel = () => {
  modalStore.isOpenQuestionForm = false;
  modalStore.isOpenExamForm = true;
}

const submitExam = async () => {
  questionsList.value = [];
  let questions = document.querySelectorAll('.questions');
  
  questions.forEach(q => {
    let ques = ref<QuestionType>({
      content: '',
      answers: []
    });

    let content = q.querySelector('input');
    ques.value!.content = content?.value || '';
    let answers = q.querySelectorAll('.answers');
    answers.forEach(a  => {
      let answerContent = a.querySelector('input')    
      let checkbox = a.querySelector('[role=checkbox] span');      

      ques.value?.answers.push({
        content: answerContent?.value || '',
        is_correct: checkbox ? true : false
      })
    })
    
    questionsList.value.push(ques.value);
  });

  isLoading.value = true;

  await axiosClient.post('/api/createExam', {
    user_id: userStore.user?.id,
    code: examStore.code,
    subject: examStore.subject,
    time: examStore.time,
    redo: examStore.redo === 'true',
    review: examStore.review === 'true',
    questions: questionsList.value
  }).then(async res => {
    console.log(res.data);  
    toast.success('テストの作成に成功しました!');

    modalStore.isOpenExamForm = false;
    modalStore.isOpenQuestionForm = false;
    
    await axiosClient.get('/api/exams').then(res => {
    examsStore.exams = res.data;
  })
    
  }).catch(err => {
    console.log(err);
    toast.error('問題が発生しました。');

  }).finally(() => {
    isLoading.value = false;
  })

}

</script>