import axios from 'axios'
import store from '@/store'
import { message, notification } from 'ant-design-vue'
import { businessCodeStatus, httpCodeStatus } from './consts'

const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_REQUEST_BASE}/api`,
  timeout: 6000
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = store.getters['auth/token']
  config.headers['Content-Type'] = 'application/json'

  return config
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => {
  const rspData = response.data

  // TODO 需要和后端协商业务代码含义此处添加
  if (rspData.code !== businessCodeStatus.SUCCESS) {
    if (rspData.message) {
      message.error(rspData.message)
    }
    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  // 此处含义一般为，无法删除，用户名密码错误等，对请求的行为本身进行回应
  if (!rspData.success) {
    if (rspData.message) {
      message.error(rspData.message)
    }
    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  if (rspData.message) {
    message.success(rspData.message)
  }
  return {
    response,
    result: rspData,
    data: rspData.data
  }
}, (error) => {
  let rsponseHttpCodeStatus = 0

  try {
    rsponseHttpCodeStatus = error.response.data.status
  } catch (err) {
    // 处理超时，如果超时进行提示
    if (error.toString().indexOf('Error: timeout') !== -1) {
      notification.error({
        message: '网络超时'
      })
      return Promise.reject(error)
    }
  }

  if (rsponseHttpCodeStatus === httpCodeStatus.UNAUTHORIZED) {
    notification.error({
      message: '登录状态已失效，请重新登录'
    })

    return Promise.reject(error)
  }

  if (rsponseHttpCodeStatus === httpCodeStatus.FORBIDDEN) {
    notification.error({
      message: '抱歉您无权访问该资源'
    })

    return Promise.reject(error)
  }

  notification.error({
    message: '数据请求失败'
  })
  return Promise.reject(error)
})

export default axiosInstance
