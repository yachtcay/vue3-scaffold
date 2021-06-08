import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router-table'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
