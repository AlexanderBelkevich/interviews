<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/stores/user'

const isLoggedIn = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const userStore = useUserStore()

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      isLoggedIn.value = true
      userStore.userId = user.uid
    } else {
      isLoggedIn.value = false
      userStore.userId = ''
    }
    isLoading.value = false
  })
})
</script>

<template>
  <app-spinner class="spinner" v-if="isLoading" />
  <template v-else>
    <div class="container">
      <AppHeader :isLoggedIn="isLoggedIn" />

      <div class="content">
        <RouterView />
      </div>
    </div>
  </template>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
.spinner {
  display: block;
}
</style>
