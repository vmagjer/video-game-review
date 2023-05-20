import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import GameDetailPage from '@/pages/GameDetailsPage.vue'
import GaneSearchPage from '@/pages/GameSearchPage.vue'
import CreateGamePage from '@/pages/CreateGamePage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'VGR',
    },
    children: [
      {
        path: '',
        component: GaneSearchPage,
        meta: {
          title: 'Game Search | VGR',
        },
      },
      {
        path: '/games/:gameId',
        component: GameDetailPage,
        meta: {
          title: 'Game Detail | VGR',
        },
      },
      {
        path: '/games/create',
        component: CreateGamePage,
        meta: {
          title: 'New Game | VGR',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
