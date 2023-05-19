import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import GameDetailPage from '@/pages/GameDetailsPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'VGR',
    },
  },
  {
    path: '/games/:gameId',
    component: GameDetailPage,
    meta: {
      title: 'Game Detail | VGR',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
