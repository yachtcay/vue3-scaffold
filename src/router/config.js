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
 * v4 版本路由只需要 return 即可，不需要 next 但是也保留有
 */
router.beforeEach(async (to) => {
  NProgress.start()

  const token = store.getters['auth/token']
  const user = store.getters['user/userInfo']

  // 路由白名单中如果有，直接跳转目标页面
  if (!token && routesNameWhiteList.indexOf(to.name) !== -1) {
    return true
  }

  // 如果没有令牌，直接跳转登录页面
  if (!token) {
    return {
      name: 'Login',
      params: {
        message: '登录状态已失效，请先登录'
      }
    }
  }

  // 如果没有用户信息，则可能是已经登录成功，但是用户刷新了页面，此时重新拉取必要数据即可
  if (!user) {
    try {
      await store.dispatch('user/getUser')
    } catch (error) {
      return {
        name: 'Login',
        params: {
          message: '发生错误，请联系管理员'
        }
      }
    }
  }

  // 到这里有个特殊情况，在令牌和用户信息都存在的情况下，如果访问首页，直接跳转到 Home 页，因为 Login 页面特殊性放在第一个判断
  if (to.name === 'Login') {
    return {
      name: 'Home'
    }
  }

  return true
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
