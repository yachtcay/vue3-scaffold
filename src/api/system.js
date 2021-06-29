import http from '@/http'

export const queryMenu = () => http.get('/menu')

export const queryDictionary = () => http.get('/dictionary')
