import MainLayout from '@/layouts/MainLayout'
import Home from '@/views/home'
import Error404 from '@/views/features/404'
import Login from '@/views/login'

// feature
const feature = [
  {
    path: '/404',
    name: 'NotFound',
    component: Error404
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 基本路由
const base = [
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
        component: Home
      }
    ]
  }
]

// 系统路由
const system = [
  {
    path: '/example',
    component: MainLayout,
    redirect: '/example/example1',
    children: [
      {
        path: 'example1',
        name: 'Example1',
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

// 业务路由
const example = [
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

export const systemRoutes = feature.concat(base, end)
export const business = example

export default feature.concat(base, business, end)
