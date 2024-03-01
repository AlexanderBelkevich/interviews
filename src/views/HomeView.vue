<script setup lang="ts">
import {computed} from 'vue'
const test = computed<string>(() => 'test')
import TheWelcome from '@/components/TheWelcome.vue'


</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
