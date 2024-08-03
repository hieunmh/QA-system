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
          
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img :src="`http://127.0.0.1:8000/${userStore.user?.image}`" 
                alt="avatar" class="h-12 w-12 aspect-square rounded-full border"
              >
            </DropdownMenuTrigger>
            <DropdownMenuContent class="font-semibold">
              <DropdownMenuItem class="flex items-center justify-center">プロフィル</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="isOpen = true" class="flex items-center justify-center">
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div v-else class="h-full flex items-center space-x-2">
          <Skeleton class="w-[150px] h-6" />
          <Skeleton class="h-12 w-12 aspect-square rounded-full" />
        </div>
      </div>
    </div>

    <Dialog :open="isOpen">
      <DialogTrigger class=" items-center justify-start space-x-2 hidden">
        <Icon name="material-symbols:logout-rounded" size="24" />
        <p>ログアウト</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle class="text-center font-bold text-2xl mb-2">ログアウト</DialogTitle>
          <DialogDescription class="text-center text-base">
            本当にログアウトしてもよろしいですか？
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose @click="isOpen = false" class="border py-2 px-3 rounded-md hover:bg-gray-50 font-semibold">
            閉じる
          </DialogClose>

          <Button class="w-[100px]" @click="logout()">
            <Icon v-if="isLoading" name="icon-park-outline:loading-four" size="20" class="animate-spin" />
            <p v-else>ログアウト</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    

    <slot />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '~/stores/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue';
import axiosClient from '~/lib/axios';
const userStore = useUserStore();

let isLoading = ref(false);
const token = useCookie('XSRF-TOKEN');
const role = useCookie('r');
const router = useRouter();

let isOpen = ref(false);

const logout = async () => {
  isLoading.value = true;
  await axiosClient.post('/logout');
  token.value = null;
  role.value = null;
  isLoading.value = false;
  router.push('/signin');
}

</script>