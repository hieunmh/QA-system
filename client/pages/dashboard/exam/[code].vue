<template>
  <DashboardLayout>
    <div class="bg-[#fafafc] w-full h-[calc(100%-88px)] p-5">
      <div class="flex w-full items-center justify-between">
        <div class="font-semibold">コード: {{ exam?.code }}</div>

        <div class="flex items-center space-x-2">
          <Icon name="material-symbols:edit-rounded" size="24" class="cursor-pointer" />
          <Icon name="ic:baseline-delete" size="24" class="cursor-pointer" />
        </div>
      </div>

      <div class="w-full mt-5 h-[calc(100%-48px)] space-y-5 overflow-y-scroll no-scrollbar">
        <div v-for="question, index in exam?.questions" class="bg-white shadow-md border rounded-md p-3">
          <div class="w-full rounded-md">
            <span class="font-bold">問題 {{ index + 1 }}:</span> {{ question.content }}
          </div>

          <div v-for="answer, index in question.answers" class="py-2" :class="answer.is_correct && 'text-green-500 font-semibold'">
            <span>{{ String.fromCharCode(index + 65) }}.</span>  {{ answer.content }}
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/layouts/DashboardLayout.vue';
import { useExamsStore } from '~/stores/exams';
import { ScrollArea } from '~/components/ui/scroll-area';

const examsStore = useExamsStore();
const route = useRoute();

let exam = ref(examsStore.exams?.find(exam => exam.code === route.params.code));

</script>