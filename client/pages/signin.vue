<template>
  <div class="h-screen w-screen bg-[#fafafc] flex items-center justify-center">
    <div  iv class="w-[450px] md:bg-white md:shadow-md md:border rounded-xl p-8">
      <p class="text-center font-bold text-3xl">ログイン</p>

      <form class="my-5">
        <div class="w-full relative">
          <span class="font-semibold">メールアドレス</span>
          <Icon name="material-symbols:mail-rounded" size="24" class="absolute top-[37px] left-2 text-primary" />
          <input type="text" class="w-full border-2 px-10 py-2.5 rounded-md outline-none" 
            :class="emailError ? 'border-rose-500' : 'focus:border-common'" placeholder="example@prg.co.jp" v-model="email"
          >
          <p class="text-rose-500 h-4 text-xs pt-0.5 font-semibold">{{ emailError }}</p>
        </div>

        <div class="w-full relative mt-3">
          <span class="font-semibold">パスワード</span>
          <Icon :name="showPassword ? 'material-symbols:lock-open-right-rounded' : 'material-symbols:lock'" size="24" class="absolute top-[37px] left-2 text-primary" />
          <Icon @click="toggleShowPassword()" :name="showPassword ? 'mdi:eye' : 'mdi:eye-off'" 
            size="20" class="absolute top-[40px] right-3 text-primary cursor-pointer" 
          />
          <input :type="showPassword ? 'text' : 'password'" class="w-full border-2 px-10 py-2.5 rounded-md outline-none" 
            :class="passwordError ? 'border-rose-500' : 'focus:border-common'" v-model="password"
          >
          <p class="text-rose-500 h-4 text-xs py-0.5 font-semibold">{{ passwordError }}</p>
        </div>

        <div class="text-end hover:underline text-sm font-semibold cursor-pointer">パスワードをお忘れの方</div>

        <Button @click="signin()" class="bg-common mt-5 w-full hover:bg-common/90 py-6">
          <Icon v-if="isLoading"name="icon-park-outline:loading-four" size="24" class="animate-spin"/>
          <p v-else>ログイン</p>
        </Button>
      </form>


      <div class="h-4 text-center text-xs pt-1 text-rose-500 font-semibold">{{ serverError }}</div>

      <Button class="w-full flex items-center justify-center py-6 border bg-white hover:bg-gray-50 space-x-1">
        <img src="/google.png" alt="google" class="w-[24px]">
        <p class="text-black">グーグルでログイン</p>
      </Button>

      <div class="w-full text-center mt-3"> 
        <NuxtLink to="/signup" class=" font-semibold hover:underline">新しいアカウントを登録</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'is-logged-in' });

import { Button } from '@/components/ui/button';
import { Icon } from '#components';
import axiosClient from '~/lib/axios';
import { useUserStore } from '~/stores/user';

let email = ref('');
let password = ref('');
let emailError = ref('');
let passwordError = ref('');
let serverError = ref('');
let showPassword = ref(false);
let isLoading = ref(false);

const userStore = useUserStore();
const router = useRouter();

const toggleShowPassword = () => {
  if (showPassword.value) showPassword.value = false;
  else showPassword.value = true;
}

watch(() => email.value, () => serverError.value = '');

watch(() => password.value, () => serverError.value = '');


const signin = async () => {
  if (!email.value) {
    emailError.value = 'メールアドレスを入力してきださい。'
    return;
  } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    emailError.value = '無効なメールアドレス。';
    return;
  } else {
    emailError.value = '';
  }

  if (!password.value) {
    passwordError.value = 'パスワードを入力してきださい。';
    return;
  } else if (password.value.length < 8) {
    passwordError.value = 'パスワードは8文字以上でなければなりません。';
    return;
  } else {
    passwordError.value = '';
  }

  isLoading.value = true;

  await axiosClient.get('/sanctum/csrf-cookie');

  await axiosClient.post('/login', { email: email.value, password: password.value }).then(async res => {
    const user = (await axiosClient.get('/api/user')).data;
    userStore.user = user;
    router.push('/dashboard');

  }).catch(err => {
    serverError.value = 'メールアドレスまたはパスワードが間違っています。';
  }).finally(() => {
    isLoading.value = false;
  });
}

</script>