/**
 * 新版文档中，路由数组中的顺序并不重要
 * https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
 */

import AppLayout from '@/layouts/app-layout'
import NotFoundError from '@/views/features/404'
import Login from '@/views/login'

// 基本路由
const base = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundError,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: AppLayout,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/features/redirect'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'NotFound'
    },
    meta: {
      requiresAuth: false
    }
  }
]

// 首页
const home = [
  {
    path: '/',
    component: AppLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
        },
        component: () => import('@/views/home')
      }
    ]
  }
]

// 系统路由
const system = [
]

// 业务路由
const example = [
  {
    path: '/example',
    name: 'Example',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Example1'
    },
    children: [
      {
        path: 'example1',
        name: 'Example1',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      },
      {
        path: 'example2',
        name: 'Example2',
        meta: {
        },
        component: () => import('@/views/business/example/example2')
      },
      {
        path: 'example3',
        name: 'Example3',
        meta: {
        },
        component: () => import('@/views/business/example/example3')
      },
      {
        path: 'example4',
        name: 'Example4',
        meta: {
        },
        component: () => import('@/views/business/example/example4/layout'),
        redirect: {
          name: 'Example4List'
        },
        children: [
          {
            path: 'list',
            name: 'Example4List',
            meta: {
            },
            component: () => import('@/views/business/example/example4/list.vue')
          },
          {
            path: 'detail',
            name: 'Example4Detail',
            meta: {
            },
            component: () => import('@/views/business/example/example4/detail.vue')
          }
        ]
      },
      {
        path: 'example5',
        name: 'Example5',
        meta: {
        },
        component: () => import('@/views/business/example/example1.vue')
      }
    ]
  }
]

// business
const business = [
  {
    path: '/business',
    name: 'Business',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business1'
    },
    children: [
      {
        path: 'business1',
        name: 'Business1',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      },
      {
        path: 'business2',
        name: 'Business2',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      },
      {
        path: 'business3',
        name: 'Business3',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const requiresAuthRoutes = [
  ...home,
  ...system,
  ...example,
  ...business
]
export {
  base,
  requiresAuthRoutes
}
