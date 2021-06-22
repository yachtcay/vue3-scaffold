import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import router from './creactor'

NProgress.configure({ showSpinner: false })

// 获取到用户信息以后，进行授权判断
function hasAuthRoute(to) {
  if (to.name === 'Home') {
    return true
  }

  return store.getters['system/authRouteKeys'].indexOf(to.name) !== -1
}

/**
 * 前置路由守卫
 * v4 版本路由只需要 return 即可，不需要 next 但是也保留有
 */
router.beforeEach(async (to) => {
  NProgress.start()

  const token = store.getters['auth/token']
  const user = store.getters['user/userInfo']

  // 没有令牌，如果这个页面不需要验证，就正常路由
  if (!token && 'requiresAuth' in to.meta && to.meta.requiresAuth === false) {
    return true
  }

  // 如果没有令牌，直接跳转登录页面
  if (!token) {
    return {
      name: 'Login',
      replace: true,
      params: {
        message: '登录状态已失效，请先登录'
      }
    }
  }

  // 如果没有用户信息，则可能是已经登录成功，但是用户刷新了页面，此时重新拉取必要数据即可
  if (!user) {
    try {
      await store.dispatch('system/buildNavigationMenu')
      await store.dispatch('user/getUser')

      // 在有令牌的情况下，尝试路由登录页则跳转首页
      if (to.name === 'Login') {
        return {
          name: 'Home',
          replace: true
        }
      }

      return hasAuthRoute(to) ? { ...to, replace: true } : false
    } catch (error) {
      return false
    }
  }

  return hasAuthRoute(to)
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
