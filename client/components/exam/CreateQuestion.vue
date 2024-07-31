<template>
  <div class="w-full bg-white p-4 rounded-md shadow-lg mb-5 border">
    <div class="w-full space-y-3">
      <input type="text" class="w-full bg-[#f2f3f4] outline-none py-2 px-3 rounded-sm placeholder:font-semibold" placeholder="問題">

      <div v-for="item, index in answerQuantity" class="w-full">
        <div v-show="item === 1" class="flex space-x-2 items-center">
          <Checkbox class="h-5 w-5" />
          <input type="text" class="w-full border-b-[1.5px] border-b-gray-300 outline-none px-3 placeholder:font-semibold">
          <button @click="removeAnswer(index)">
            <Icon name="ic:round-close" size="24" class="" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-full mt-5 flex items-center justify-center relative font-semibold">
      <button @click="addQuestion()" class="flex items-center hover:underline">
        <Icon name="material-symbols:add-rounded" size="30" class="" />
        <p>回答を追加</p>
      </button>
      <button @click="props.remove(id)" class="flex items-center absolute right-0">
        <Icon name="ic:baseline-delete" size="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';
interface Props {
  remove: (index: number) => void;
  visible: number;
  id: number;
}

const props = defineProps<Props>()

let answerQuantity = ref([1]);

const addQuestion = () => {
  answerQuantity.value.push(1);
}

const removeAnswer = (index: number) => {
  let visibleAnswer = answerQuantity.value.filter(value => value === 1).length;

  if (visibleAnswer === 1) {
    return;
  }

  answerQuantity.value[index] = 0;
  
}

</script>