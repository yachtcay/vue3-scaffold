/**
 * 新版文档中，路由数组中的顺序并不重要
 * https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
 */

import MainLayout from '@/layout/MainLayout'
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
  },
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
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'NotFound'
    }
  }
]

// 系统路由
const system = [
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
]

export {
  feature,
  system,
  example,
  base,
  end
}
