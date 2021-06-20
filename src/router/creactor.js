import { createRouter, createWebHistory } from 'vue-router'
import {
  feature,
  base
} from './router-table'

const router = createRouter({
  history: createWebHistory(),
  routes: [...feature, ...base]
})

export default router
