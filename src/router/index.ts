import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../view/HomeView.vue'
import EditorView from '../view/EditorView.vue'

const routes = [
  {path: '/', component: HomeView},
  {path: '/editor', component: EditorView},
  {path: '/:pathMatch(.*)*',redirect: '/'}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
