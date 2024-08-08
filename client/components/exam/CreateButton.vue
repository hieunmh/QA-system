<template>
  <Dialog :open="modalStore.isOpenExamForm">
    <DialogTrigger class="flex items-center justify-start space-x-2">
      <button @click="modalStore.isOpenExamForm = true" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-common text-common">
        <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-common top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span class="relative text-common transition duration-300 group-hover:text-white ease">テストを作成</span>
      </button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-center font-bold text-2xl mb-2">テストを作成</DialogTitle>
        <DialogDescription class="text-center text-base">
        </DialogDescription>
      </DialogHeader>

      <div class="w-full space-y-5">
        <div class="relative">
          <span class="font-semibold">コード</span>
          <input type="text" class="w-full border-[1.5px] py-2 pl-3 pr-[70px] rounded-md" :value="examStore.code" placeholder="コード"/>
          <button @click="autoGenCode()" class="absolute right-3 top-9 hover:underline text-sm font-semibold">自動生成</button>
        </div>
        
        <div class="flex space-x-4">
          <div class="w-full">
            <span class="font-semibold">主題</span>
            <Select class="w-full outline-none ring-0" v-model="examStore.subject">
              <SelectTrigger class="outline-none ring-0">
                <SelectValue placeholder="数学" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="数学">数学</SelectItem>
                  <SelectItem value="物理">物理</SelectItem>
                  <SelectItem value="化学">化学</SelectItem>
                  <SelectItem value="英語">英語</SelectItem>
                  <SelectItem value="文学">文学</SelectItem>
                  <SelectItem value="生物学">生物学</SelectItem>
                  <SelectItem value="歴史">歴史</SelectItem>
                  <SelectItem value="地理">地理</SelectItem>
                  <SelectItem value="哲学">哲学</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="w-full">
            <span class="font-semibold">時間(分)</span>
            <NumberField :default-value="examStore.time" :min="1" v-model="examStore.time">
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
        </div>

        <div class="flex space-x-4">
          <div class="w-full">
            <span class="font-semibold">レビュー</span>
            <Select class="w-full outline-none ring-0" v-model="examStore.review">
              <SelectTrigger class="outline-none ring-0">
                <SelectValue placeholder="許可する" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">許可する</SelectItem>
                  <SelectItem value="false">許可しない</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="w-full">
            <span class="font-semibold">やり直し</span>
            <Select class="w-full outline-none ring-0" v-model="examStore.redo">
              <SelectTrigger class="outline-none ring-0">
                <SelectValue placeholder="許可する" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">許可する</SelectItem>
                  <SelectItem value="false">許可しない</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose @click="modalStore.isOpenExamForm = false" class="border py-2 px-3 rounded-md hover:bg-gray-50 font-semibold">
          閉じる
        </DialogClose>
        <Button @click="createExam()">
          作成
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field';
import { Button } from '@/components/ui/button';

import randomstring from 'random-string';
import { useExamStore } from '~/stores/exam';
import { useModalStore } from '~/stores/modal'; 

const examStore = useExamStore();
const modalStore = useModalStore();

const autoGenCode = () => {
  examStore.code = randomstring({ length: 10 }).toLowerCase()
}

const createExam = () => {
  modalStore.isOpenExamForm = false;
  modalStore.isOpenQuestionForm = true;
}
</script>