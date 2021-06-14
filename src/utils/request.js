import axios from 'axios'

// 约定的业务状态码
const BUSINESS_CODE_SUCCESS = 20000

const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_REQUEST_BASE}/api`,
  timeout: 6000
})

axiosInstance.interceptors.request.use((config) => {
  // TODO
  return config
}, (error) => {
  console.error(error)
})

axiosInstance.interceptors.response.use((response) => {
  const rspData = response.data

  if (rspData.code !== BUSINESS_CODE_SUCCESS) {
    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  return {
    result: rspData,
    data: rspData.data
  }
})

export default axiosInstance
