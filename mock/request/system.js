module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: 'Example',
          title: 'Example',
          type: 'catalog',
          children: [
            {
              routeName: 'Example1',
              title: 'Example1',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example2',
              title: 'Example2',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example3',
              title: 'Example3',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example4',
              title: 'Example4',
              type: 'menu',
              children: [
                {
                  routeName: 'Example4List',
                  title: 'Example4List',
                  type: 'menu',
                  children: []
                },
                {
                  routeName: 'Example4Detail',
                  title: 'Example4Detail',
                  type: 'menu',
                  children: []
                }
              ]
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  }
]
