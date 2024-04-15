import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = getAuth()
  let authenticated = false

  onAuthStateChanged(auth, (user) => {
    if (user && !authenticated) {
      authenticated = true
      next()
    } else if (!user && !authenticated) {
      authenticated = true
      next({ path: '/auth' })
    }
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/ListView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () => import('@/views/InterviewView.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/StatisticView.vue'),
    beforeEnter: checkAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
