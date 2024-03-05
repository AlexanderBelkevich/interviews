<script setup lang="ts">
import {ref} from "vue";
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';

const items = ref([
  {
    label: 'Авторизация',
    icon: 'pi pi-user'
  },
  {
    label: 'Список собеседований',
    icon: 'pi pi-list'
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie'
  },
]);
</script>

<template>
  <Menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <a class="flex align-items-center" v-bind="props.action">
        <span class="p-menuitem-icon" :class="item.icon"/>
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Avatar image="/images/avatar/amyelsner.png" shape="circle"/>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>
.menu {
  margin: 30px;
}
</style>