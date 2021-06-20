module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: '',
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
              children: [],
              group: []
            },
            {
              routeName: 'Example2',
              children: [],
              group: []
            },
            {
              routeName: 'Example3',
              children: [],
              group: []
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  }
]
