module.exports = [
  {
    url: '/mock/menu',
    type: 'get',
    response(req, rsp) {
      rsp.json({
        code: 20000,
        data: [
          {
            name: 'home'
          }
        ]
      })
    }
  }
]
