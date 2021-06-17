import http from '@/http'

export function queryMenu() {
  return http.get('/menu')
}
