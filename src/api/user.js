import http from '@/http'

export const queryUser = () => http.get('/user')
