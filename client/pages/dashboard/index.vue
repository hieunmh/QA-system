<template>
  <DashboardLayout>
    <div class="bg-[#fafafc] h-full">
      123
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'is-logged-out' });
import DashboardLayout from '~/layouts/DashboardLayout.vue';
import { useUserStore } from '~/stores/user';


const userStore = useUserStore();


</script>