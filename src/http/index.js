import axios from 'axios'
import { businessCodeStatus } from './consts'

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

  if (rspData.code !== businessCodeStatus.SUCCESS) {
    return Promise.reject(new Error(rspData.message || 'Error'))
  }

  return {
    response,
    result: rspData,
    data: rspData.data
  }
})

export default axiosInstance
