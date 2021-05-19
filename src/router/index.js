import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/speed-test',
    name: 'SpeedTest',
    component: () =>
      import('../views/SpeedTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
