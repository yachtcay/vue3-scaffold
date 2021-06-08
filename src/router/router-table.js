// 基本路由
const base = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/features/404')
  }
]

// 路由匹配的末尾
const end = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export default base.concat(end)
