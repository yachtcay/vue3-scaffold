import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './creactor'

NProgress.configure({ showSpinner: false })

// 前置
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// 后置
router.afterEach(() => {
  NProgress.done()
})
