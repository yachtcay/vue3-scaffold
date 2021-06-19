module.exports = [
  {
    url: '/api/login',
    type: 'post',
    response(config) {
      const { username, password } = config.body

      if (username === 'admin' && password === 'admin') {
        return {
          code: 20000,
          data: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          message: null,
          success: true
        }
      }

      return {
        code: 20000,
        data: null,
        message: '用户名或者密码不正确',
        success: false
      }
    }
  }
]
