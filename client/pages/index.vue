<template>
  <div class="w-screen h-screen bg-[#fafafc]">
    <Header class="fixed top-0" />

    <div class="w-full h-full flex flex-col lg:flex-row items-center lg:justify-between justify-center lg:px-20 px-2">
      <div class="flex flex-col items-center text-center">
        <p class="font-bold text-4xl">
          オンラインテストを受けます。
        </p>
        <p class="font-semibold text-2xl">アクティブユーザー数</p>
      </div>

      <div>
        <img src="/home.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: 'is-logged-in' });

</script>