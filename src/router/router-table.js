import MainLayout from '@/layouts/MainLayout'
import Error404 from '@/views/features/404'
import Login from '@/views/login'

// feature
const feature = [
  {
    path: '/404',
    name: 'NotFound',
    component: Error404
  }
]

// 基本路由
const base = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 系统路由
const system = [
]

// 业务路由
const example = [
  {
    path: '/',
    component: MainLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/example',
    component: MainLayout,
    redirect: {
      name: 'Example1'
    },
    children: [
      {
        path: 'example1',
        name: 'Example1',
        component: () => import('@/views/business/example/example1')
      },
      {
        path: 'example2',
        name: 'Example2',
        component: () => import('@/views/business/example/example2')
      },
      {
        path: 'example3',
        name: 'Example3',
        component: () => import('@/views/business/example/example3')
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

// 导出需要验证的路由
const needAuthRouts = [...system, ...example]

export {
  needAuthRouts
}

// 对外只导出基本路由，具体业务路由，由后端请求来构成
export default [...feature, ...base, ...end]
