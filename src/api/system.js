import http from '@/http'

export const queryMenu = () => http.get('/menu')
