import http from '@/http'

export const login = ({ username, password }) => http.post('/login', {
  username,
  password
})
