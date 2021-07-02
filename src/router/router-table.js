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

const business1 = [
  {
    path: '/business1',
    name: 'Business1',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business11'
    },
    children: [
      {
        path: 'business11',
        name: 'Business11',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business2 = [
  {
    path: '/business2',
    name: 'Business2',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business21'
    },
    children: [
      {
        path: 'business21',
        name: 'Business21',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business3 = [
  {
    path: '/business3',
    name: 'Business3',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business31'
    },
    children: [
      {
        path: 'business31',
        name: 'Business31',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business4 = [
  {
    path: '/business4',
    name: 'Business4',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business41'
    },
    children: [
      {
        path: 'business41',
        name: 'Business41',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business5 = [
  {
    path: '/business5',
    name: 'Business5',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business51'
    },
    children: [
      {
        path: 'business51',
        name: 'Business51',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business6 = [
  {
    path: '/business6',
    name: 'Business6',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business61'
    },
    children: [
      {
        path: 'business61',
        name: 'Business61',
        meta: {
        },
        component: () => import('@/views/business/example/example1')
      }
    ]
  }
]

const business7 = [
  {
    path: '/business7',
    name: 'Business7',
    meta: {
    },
    component: AppLayout,
    redirect: {
      name: 'Business71'
    },
    children: [
      {
        path: 'business71',
        name: 'Business71',
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
  ...business,
  ...business1,
  ...business2,
  ...business3,
  ...business4,
  ...business5,
  ...business6,
  ...business7
]
export {
  base,
  requiresAuthRoutes
}
