<template>
  <div>
    <div>
      student view
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['is-logged-in', 'is-logged-out'] });
import DashboardLayout from '~/layouts/DashboardLayout.vue';


</script>