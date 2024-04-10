<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import { IInterview, IStage } from '@/interfaces'
import dayjs from 'dayjs'

const db = getFirestore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isLoading = ref<boolean>(true)
const interview = ref<IInterview>()

const docref = doc(db, `users/${userStore.userId}/interviews`, route.params.id as string)

const getData = async (): Promise<void> => {
  isLoading.value = true
  const docSnapshot = await getDoc(docref)
  interview.value = docSnapshot.data() as IInterview

  isLoading.value = false
}

const saveInterview = async (): Promise<void> => {
  isLoading.value = true
  if (interview.value?.stages && interview.value?.stages.length) {
    interview.value.stages = interview.value.stages.map((el: IStage) => {
      return {
        ...el,
        date: dayjs(el.date).format('DD.MM.YYYY')
      }
    })
  }

  await updateDoc(docref, { ...interview.value })
  router.push('/list')
  isLoading.value = false
}

const addStage = () => {
  if (interview.value) {
    if (!interview.value.stages) {
      interview.value.stages = []
    }
    interview.value.stages.push({
      name: '',
      date: '',
      description: ''
    })
  }
}

const removeStage = (index: number) => {
  if (interview.value?.stages) {
    interview.value.stages.splice(index, 1)
  }
}

onMounted(async () => await getData())
</script>
<template>
  <app-spinner class="spinner" v-if="isLoading" />
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>Собеседование в компанию {{ interview.company }}</template>
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="company">Компания</label>
          <app-inputext class="input mb-3" id="company" v-model="interview.company" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="vacancyLink">Описание вакансии (ссылка)</label>
          <app-inputext class="input mb-3" id="vacancyLink" v-model="interview.vacancyLink" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="hrName">Контакт (имя)</label>
          <app-inputext class="input mb-3" id="hrName" v-model="interview.hrName" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-inputext
            class="input mb-3"
            id="contactTelegram"
            v-model="interview.contactTelegram"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-inputext
            class="input mb-3"
            id="contactWhatsApp"
            v-model="interview.contactWhatsApp"
          />
        </div>
        <div class="flex flex-column gap-2">
          <label for="contactPhone">Телефон HR</label>
          <app-inputext class="input mb-3" id="contactPhone" v-model="interview.contactPhone" />
        </div>
        <div class="card flex flex-wrap gap-3 p-fluid mb-3">
          <div class="flex-auto">
            <app-inputnumber
              v-model="interview.salaryFrom"
              inputId="salaryFrom"
              placeholder="Зарплатная вилка от"
            />
          </div>
          <div class="flex-auto">
            <app-inputnumber
              v-model="interview.salaryTo"
              inputId="salaryTo"
              placeholder="Зарплатная вилка до"
            />
          </div>
        </div>
        <app-button
          label="Добавить этап"
          severity="info"
          icon="pi pi-plus"
          class="mb-3"
          @click="addStage"
        />
        <div v-for="(stage, i) in interview?.stages" :key="i" class="interview-stage">
          <div class="flex flex-column gap-2">
            <label :for="`stage-name-${i}`">Название этапа</label>
            <app-inputext class="input mb-3" :id="`stage-name-${i}`" v-model="stage.name" />
          </div>
          <div class="flex flex-column gap-2">
            <label :for="`stage-date-${i}`">Дата прохождения этапа</label>
            <app-calendar
              v-model="stage.date"
              :id="`stage-date-${i}`"
              class="input mb-3"
              dateFormat="dd.mm.yy"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label :for="`stage-description-${i}`">Комментарий</label>
            <app-textarea
              v-model="stage.description"
              :id="`stage-description-${i}`"
              class="input mb-3"
              rows="5"
            />
          </div>
          <app-button severity="danger" label="Удалить этап" @click="removeStage(i)" />
        </div>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex align-items-center">
            <app-radio
              v-model="interview.result"
              inputId="interviewResult1"
              name="result"
              value="Refusal"
            />
            <label for="interviewResult1" class="ml-2">Отказ</label>
          </div>
          <div class="flex align-items-center">
            <app-radio
              v-model="interview.result"
              inputId="interviewResult2"
              name="result"
              value="Offer"
            />
            <label for="interviewResult2" class="ml-2">Оффер</label>
          </div>
        </div>
        <div>
          <app-button label="Сохранить" icon="pi pi-save" @click="saveInterview" />
        </div>
      </template>
    </app-card>
  </div>
  <span v-else>err</span>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
