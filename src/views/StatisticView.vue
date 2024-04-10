<template>
  <h2>Статистика</h2>
  <div class="card flex justify-content-center">
    <app-chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IInterview } from '@/interfaces'
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'

const db = getFirestore()
const userStore = useUserStore()
const interviews = ref<IInterview[]>([])
const chartData = ref()
const chartOptions = ref()

const getAllInterviews = async <T extends IInterview>(): Promise<Array<T>> => {
  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createdAt', 'desc')
  )
  const partialDocs = await getDocs(getData)

  return partialDocs.docs.map((d) => d.data() as T)
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  const data: number[] = [0, 0, 0]
  interviews.value.forEach((element: IInterview) => {
    if (element.result === 'Offer') {
      data[0]++
    } else if (element.result === 'Refusal') {
      data[1]++
    } else {
      data[2]++
    }
  })

  return {
    labels: ['Оффер', 'Отказ', 'В процессе'],
    datasets: [
      {
        data,
        backgroundColor: [
          documentStyle.getPropertyValue('--cyan-500'),
          documentStyle.getPropertyValue('--orange-500'),
          documentStyle.getPropertyValue('--gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--cyan-400'),
          documentStyle.getPropertyValue('--orange-400'),
          documentStyle.getPropertyValue('--gray-400')
        ]
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor
        }
      }
    }
  }
}

onMounted(async () => {
  interviews.value = await getAllInterviews()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>
