<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import { IInterview } from '@/interfaces'

const userStore = useUserStore()

const db = getFirestore()
const interviews = ref<IInterview[]>([])
const isLoading = ref<boolean>(true)

async function getAllInterviews<T extends IInterview>(): Promise<Array<T>> {
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createdAt', 'desc')
  )
  const partialDocs = await getDocs(getData)

  return partialDocs.docs.map((d) => d.data() as T)
}

onMounted(async () => {
  const listInterviews = await getAllInterviews()
  interviews.value = [...listInterviews]
  console.log(interviews.value)

  isLoading.value = false
})
</script>

<template>
  <app-spinner class="spinner" v-if="isLoading" />
  <app-inlinemessage v-else-if="!isLoading && !interviews.length" severity="info">
    Нет добавленных собеседований
  </app-inlinemessage>
  <div v-else>
    <h2>Список собеседований</h2>
    <app-datatable :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactTelegram"
              class="contacts__telegram"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              target="_blank"
            >
              <span class="contacts__icon pi pi-telegram" />
            </a>
            <a
              class="contacts__whatsapp"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              target="_blank"
              v-if="slotProps.data.contactWhatsApp"
            >
              <span class="contacts__icon pi pi-whatsapp" />
            </a>
            <a
              class="contacts__phone"
              v-if="slotProps.data.contactPhone"
              :href="`tel:${slotProps.data.contactPhone}`"
              target="_blank"
            >
              <span class="contacts__icon pi pi-phone" />
            </a>
          </div>
        </template>
      </app-column>
      <app-column header="Пройденные этапы">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages">Не заполнено</span>
          <div v-else>
            <div class="interview-stages">
              <app-badge
                v-for="(stage, i) in slotProps.data.stages"
                :key="i"
                :value="i + 1"
                rounded
                v-tooltip.top="stage.name"
              />
            </div>
          </div>
        </template>
      </app-column>
      <app-column header="Результат">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result">Не заполнено</span>
          <div v-else>
            <app-badge
              :severity="slotProps.data.result === 'Оффер' ? 'success' : 'danger'"
              :value="slotProps.data.result"
            />
          </div>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <router-link :to="`/interview/${slotProps.data.id}`">
            <app-button icon="pi pi-pencil" severity="info" />
          </router-link>
        </template>
      </app-column>
    </app-datatable>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
