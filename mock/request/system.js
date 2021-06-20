module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: 'Example',
          type: 'catalog',
          group: [
            {
              name: 'group1',
              groupIndexs: [0, 1]
            },
            {
              name: 'group2',
              groupIndexs: [2]
            }
          ],
          children: [
            {
              routeName: 'Example1',
              type: 'menu',
              group: [],
              children: []
            },
            {
              routeName: 'Example2',
              type: 'menu',
              group: [],
              children: []
            },
            {
              routeName: 'Example3',
              type: 'menu',
              group: [],
              children: []
            },
            {
              routeName: 'Example4',
              type: 'menu',
              group: [],
              children: [
                {
                  routeName: 'Example4List'
                },
                {
                  routeName: 'Example4Detail'
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
