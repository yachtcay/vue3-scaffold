import { createRouter, createWebHistory } from 'vue-router'
import {
  feature,
  base,
  end,
  system,
  example
} from './router-table'

const router = createRouter({
  history: createWebHistory(),
  routes: [...feature, ...base, ...system, ...example, ...end]
})

export default router
