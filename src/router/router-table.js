import MainLayout from '@/layouts/MainLayout'

// feature
const feature = [
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/features/404')
  }
]

// 基本路由
const base = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

// 路由匹配的末尾
const end = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export default feature.concat(base, end)
