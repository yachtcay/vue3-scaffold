module.exports = [
  {
    url: '/api/login',
    type: 'post',
    response(config) {
      const { username, password } = config.body

      if (username === 'admin' && password === 'admin') {
        return {
          code: 20000,
          data: true,
          message: '登录成功',
          success: true
        }
      }

      return {
        code: 20000,
        data: true,
        message: '用户名或者密码不正确',
        success: false
      }
    }
  }
]
