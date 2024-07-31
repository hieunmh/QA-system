<script setup lang="ts">
import { NumberFieldInput } from 'radix-vue'
import { cn } from '@/lib/utils'
</script>

<template>
  <NumberFieldInput data-slot="input" :class="cn('flex h-10 w-full rounded-md border-[1.5px] border-input bg-background py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50')" />
</template>
