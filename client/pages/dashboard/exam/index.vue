<template>
  <DashboardLayout>
    <div class="w-full h-full px-5 py-3 bg-[#fafafc]">
      <div class="w-full h-full space-y-4">
        <div class="flex justify-between items-center">
          <p class="text-2xl font-semibold">テスト</p>

          <ExamCreateButton />
        </div>

        <div class="w-full h-[calc(100%-128px)] bg-white shadow-lg border rounded-md p-5">
          <div class="grid grid-cols-12 font-semibold pb-5">
            <div class="col-span-2 text-center">番</div>
            <div class="col-span-2 text-center">宿題</div>
            <div class="col-span-2 text-center">コード</div>
            <div class="col-span-2 text-center">質問数</div>
            <div class="col-span-2 text-center">やった人</div>
            <div class="col-span-2 text-center">時間</div>
          </div>
          
          <NuxtLink :to="`/dashboard/exam/${exam.code}`" v-for="(exam, index) in examList" class="grid grid-cols-12 font-normal py-5 hover:bg-gray-50 border-t">
            <div class="col-span-2 text-center">{{ index + 1 }}</div>
            <div class="col-span-2 text-center">{{ exam.subject }}</div>
            <div class="col-span-2 text-center">{{ exam.code }}</div>
            <div class="col-span-2 text-center">{{  exam.quantity  }}</div>
            <div class="col-span-2 text-center">{{ exam.done }}</div>
            <div class="col-span-2 text-center">{{ exam.time }}</div>
          </NuxtLink> 
        </div>

        <div class="w-full flex items-center justify-center">
          <Pagination v-slot="{ page }" :total="examList.length * 10" :sibling-count="1" show-edges :default-page="2">
            <PaginationList v-slot="{ items }" class="flex items-center gap-1">
              <PaginationFirst />
              <PaginationPrev />

              <template v-for="(item, index) in items">
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
import DashboardLayout from '~/layouts/DashboardLayout.vue';

import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; 
import axiosClient from '~/lib/axios';

// onMounted(async () => {
//   await axiosClient.get('/api/exams').then(res => {
//     console.log(res.data);
//   })
// })

const examList = [
  {
    subject: '数学',
    code: 'dad123vffd',
    quantity: 12,
    done: 14,
    time: 5
  },
  {
    subject: '数学',
    code: 'dad123vffd',
    quantity: 12,
    done: 14,
    time: 5
  },
  {
    subject: '数学',
    code: 'dad123vffd',
    quantity: 12,
    done: 14,
    time: 5
  },
  {
    subject: '数学',
    code: 'dad123vffd',
    quantity: 12,
    done: 14,
    time: 5
  },
];


</script>