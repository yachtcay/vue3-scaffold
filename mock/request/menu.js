module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: 'Home',
          groupName: '',
          children: []
        },
        {
          routeName: '',
          groupName: 'Example',
          children: [
            {
              routeName: 'Example1',
              groupName: '',
              children: []
            },
            {
              routeName: 'Example2',
              groupName: '',
              children: []
            },
            {
              routeName: 'Example3',
              groupName: '',
              children: []
            }
          ]
        }
      ],
      message: '',
      success: true
    })
  }
]
