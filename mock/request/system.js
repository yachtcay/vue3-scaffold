module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: 'Home',
          title: '首页',
          type: 'menu',
          children: []
        },
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
            },
            {
              routeName: '',
              title: 'Example5',
              type: 'group',
              children: [
                {
                  routeName: 'Example5',
                  title: 'Example5',
                  type: 'menu',
                  children: []
                }
              ]
            }
          ]
        },
        {
          routeName: 'Business',
          title: 'Business',
          type: 'catalog',
          children: [
            {
              routeName: 'Business1',
              title: 'Business1',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Business2',
              title: 'Business2',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Business3',
              title: 'Business3',
              type: 'menu',
              children: []
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  }
]
