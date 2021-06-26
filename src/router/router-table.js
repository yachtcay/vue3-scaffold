/**
 * 新版文档中，路由数组中的顺序并不重要
 * https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%9C%A8%E5%8F%82%E6%95%B0%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%AD%A3%E5%88%99
 */

import {
  StarOutlined
} from '@ant-design/icons-vue'
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
          title: '首页'
        },
        component: () => import('@/views/home'),
        icon: StarOutlined
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
      title: '示例'
    },
    component: AppLayout,
    icon: StarOutlined,
    redirect: {
      name: 'Example1'
    },
    children: [
      {
        path: 'example1',
        name: 'Example1',
        meta: {
          title: '示例1'
        },
        component: () => import('@/views/business/example/example1'),
        icon: StarOutlined
      },
      {
        path: 'example2',
        name: 'Example2',
        meta: {
          title: '示例2'
        },
        component: () => import('@/views/business/example/example2'),
        icon: StarOutlined
      },
      {
        path: 'example3',
        name: 'Example3',
        meta: {
          title: '示例3'
        },
        component: () => import('@/views/business/example/example3'),
        icon: StarOutlined
      },
      {
        path: 'example4',
        name: 'Example4',
        meta: {
          title: '示例4 - layout',
          layout: true
        },
        component: () => import('@/views/business/example/example4/layout'),
        icon: StarOutlined,
        redirect: {
          name: 'Example4List'
        },
        children: [
          {
            path: 'list',
            name: 'Example4List',
            meta: {
              title: '示例4 - List'
            },
            component: () => import('@/views/business/example/example4/list.vue')
          },
          {
            path: 'detail',
            name: 'Example4Detail',
            meta: {
              title: '示例4 - Detail'
            },
            component: () => import('@/views/business/example/example4/detail.vue')
          }
        ]
      },
      {
        path: 'example5',
        name: 'Example5',
        meta: {
          title: '示例51'
        },
        component: () => import('@/views/business/example/example1.vue'),
        icon: StarOutlined
      }
    ]
  }
]

const requiresAuthRoutes = [...home, ...system, ...example]
export {
  base,
  requiresAuthRoutes
}
