<template>
  <div class="w-[250px] h-full bg-common flex flex-col justify-between py-5">
    <div class="flex flex-col space-y-3">
      <NuxtLink to="/dashboard" class="px-5 py-3 font-semibold text-white relative flex items-center">
        <div v-if="route.path === '/dashboard'" class="h-full w-1 rounded-r-md bg-white absolute left-0" />
        ダッシュボード
      </NuxtLink>

      <NuxtLink to="/dashboard/exam" class="px-5 py-3 font-semibold text-white relative flex items-center">
        <div v-if="route.path === '/dashboard/exam'" class="h-full w-1 rounded-r-md bg-white absolute left-0" />
        テスト
      </NuxtLink>
    </div>

    <div class="w-full px-5">
      <Button class="bg-transparent text-white px-5 text-base hover:bg-transparent">
        <Dialog>
          <DialogTrigger class="flex items-center justify-start space-x-2">
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
              <DialogClose class="border py-2 px-3 rounded-md hover:bg-gray-50 font-semibold">
                閉じる
              </DialogClose>

              <Button class="w-[100px]" @click="logout()">
                <Icon v-if="isLoading" name="icon-park-outline:loading-four" size="20" class="animate-spin" />
                <p v-else>ログアウト</p>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from './ui/button';
import { Icon } from '#components';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import axiosClient from '~/lib/axios';
const token = useCookie('XSRF-TOKEN');

let isLoading = ref(false);

const route = useRoute();
const router = useRouter();

const logout = async () => {
  isLoading.value = true;
  await axiosClient.post('/logout');
  token.value = null;
  isLoading.value = false;
  router.push('/signin');
}


</script>