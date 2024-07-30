<template>
  <div class="w-screen bg-white h-20 flex items-center justify-between px-2 lg:px-20">
    <NuxtLink to="/" class="flex space-x-2">
      <img src="/logo.png" alt="logo" class="h-[30px]" />
      <p class="font-bold text-common text-3xl">ピ</p>
    </NuxtLink>

    <div class="flex space-x-2">
      <NuxtLink to="/signin" class="border py-2.5 px-4 rounded-md font-semibold hover:bg-gray-50">
        ログイン
      </NuxtLink>

      <NuxtLink to="/signup" class="border py-2.5 px-4 rounded-md font-semibold text-white bg-common hover:bg-common/90 ">
        はじめはしょう
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>