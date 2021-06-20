import { createRouter, createWebHistory } from 'vue-router'
import {
  feature,
  base,
  requiresAuthRoutes
} from './router-table'

const router = createRouter({
  history: createWebHistory(),
  routes: [...feature, ...requiresAuthRoutes, ...base]
})

export default router
