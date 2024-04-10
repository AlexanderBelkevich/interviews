import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import { initializeApp } from 'firebase/app'
import ru from '@/locales/ru.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Card from 'primevue/card'
import Calendar from 'primevue/calendar'
import ProgressSpinner from 'primevue/progressspinner'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Textarea from 'primevue/textarea'
import InlineMessage from 'primevue/inlinemessage'
import RadioButton from 'primevue/radiobutton'
import Tooltip from 'primevue/tooltip'
import Badge from 'primevue/badge'
import Chart from 'primevue/chart'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'

const firebaseConfig = {
  apiKey: 'AIzaSyDtpZ8R3VjpEc9STZrvv8APoCBUbUVP9fQ',
  authDomain: 'list-interview-466a9.firebaseapp.com',
  projectId: 'list-interview-466a9',
  storageBucket: 'list-interview-466a9.appspot.com',
  messagingSenderId: '970216419434',
  appId: '1:970216419434:web:80f11b8734bb2b94c01a13'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  locale: ru
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)
app.component('app-menubar', Menubar)
app.component('app-inputext', InputText)
app.component('app-button', Button)
app.component('app-toast', Toast)
app.component('app-card', Card)
app.component('app-calendar', Calendar)
app.component('app-spinner', ProgressSpinner)
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-textarea', Textarea)
app.component('app-inlinemessage', InlineMessage)
app.component('app-radio', RadioButton)
app.component('app-badge', Badge)
app.component('app-chart', Chart)
app.component('app-inputnumber', InputNumber)
app.component('app-dialog', ConfirmDialog)

app.mount('#app')
