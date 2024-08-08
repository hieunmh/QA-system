<template>
  <div class="w-full h-full fixed flex items-center justify-center">
    <div class="flex flex-col justify-center items-center space-y-3">
      <p class="text-3xl font-semibold">404 ページが見つかりません</p>
      <NuxtLink to="/">
        <Button>
          ホームページに戻ります。
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from './components/ui/button';

const router = useRouter();

const backRouter = () => {
  router.back();
}

</script>