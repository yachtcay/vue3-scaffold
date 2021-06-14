import request from '@/utils/request'

export function fetchMenu() {
  return request({
    url: '/menu',
    method: 'get'
  })
}
