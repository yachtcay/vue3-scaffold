import { createRouter, createWebHashHistory } from 'vue-router'
import {
  feature,
  base,
  end,
  system,
  example
} from './router-table'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...feature, ...base, ...system, ...example, ...end]
})

export default router
