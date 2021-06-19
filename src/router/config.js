import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import router from './creactor'

NProgress.configure({ showSpinner: false })

const routesNameWhiteList = [
  'Login'
]

/**
 * 前置路由守卫
 * 路由守卫跳转页面是 next 方法，为了方便多种顺序判断，
 * 额外增加 return 'done' 使函数按照 next() 执行位置结束，
 * 类似标识，没有任何含义，只是为了结束函数执行
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const token = store.getters['auth/token']
  const user = store.getters['user/userInfo']

  // 路由白名单中如果有直接跳转目标页面
  if (routesNameWhiteList.indexOf(to.name) !== -1) {
    next()
    return 'done'
  }

  // 如果没有令牌，直接跳转登录页面
  if (!token) {
    next({
      name: 'Login'
    })

    return 'done'
  }

  // 如果没有用户信息，则可能是已经登录成功，但是用户刷新了页面，此时重新拉取必要数据即可
  if (!user) {
    try {
      await store.dispatch('user/getUser')

      next({ ...to, replace: true })
      return 'done'
    } catch (error) {
      next({
        name: 'Login'
      })
      return 'done'
    }
  }

  // 到这里有个特殊情况，在令牌和用户信息都存在的情况下，如果访问首页，直接跳转到 Home 页
  if (to.name === 'Login') {
    next({
      name: 'Home'
    })
    return 'done'
  }

  next()
  return 'done'
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
