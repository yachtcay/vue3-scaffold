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
          uniqueTag: 'Home',
          type: 'menu',
          children: []
        },
        {
          routeName: 'Example',
          title: 'Example',
          uniqueTag: 'Example',
          type: 'catalog',
          children: [
            {
              routeName: 'Example1',
              title: 'Example1',
              uniqueTag: 'Example1',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example2',
              title: 'Example2',
              uniqueTag: 'Example2',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example3',
              title: 'Example3',
              uniqueTag: 'Example3',
              type: 'menu',
              children: []
            },
            {
              routeName: 'Example4',
              title: 'Example4',
              uniqueTag: 'Example4',
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
              uniqueTag: 'Example5Group',
              type: 'group',
              children: [
                {
                  routeName: 'Example5',
                  title: 'Example5',
                  uniqueTag: 'Example5',
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
          uniqueTag: 'Business',
          type: 'catalog',
          children: [
            {
              routeName: 'Business1Catalog',
              title: 'Business1-catalog',
              uniqueTag: 'Business1',
              type: 'catalog',
              children: [
                {
                  routeName: 'Business1',
                  title: 'Business1-menu',
                  uniqueTag: 'Business1Menu',
                  type: 'menu',
                  children: []
                }
              ]
            }
          ]
        },
        {
          routeName: 'Business1',
          title: 'Business1',
          uniqueTag: 'Business1',
          type: 'catalog',
          children: [
            {
              routeName: 'Business11',
              title: 'Business11',
              uniqueTag: 'Business11',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business2',
          title: 'Business2',
          uniqueTag: 'Business2',
          type: 'catalog',
          children: [
            {
              routeName: 'Business21',
              title: 'Business11',
              uniqueTag: 'Business21',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business3',
          title: '业务代码',
          uniqueTag: 'Business3',
          type: 'catalog',
          children: [
            {
              routeName: 'Business31',
              title: 'Business31',
              uniqueTag: 'Business31',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business4',
          title: 'Business4',
          uniqueTag: 'Business4',
          type: 'catalog',
          children: [
            {
              routeName: 'Business41',
              title: 'Business41',
              uniqueTag: 'Business41',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business5',
          title: 'Business5',
          uniqueTag: 'Business5',
          type: 'catalog',
          children: [
            {
              routeName: 'Business51',
              title: 'Business51',
              uniqueTag: 'Business51',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business6',
          title: 'Business6',
          uniqueTag: 'Business6',
          type: 'catalog',
          children: [
            {
              routeName: 'Business61',
              title: 'Business61',
              uniqueTag: 'Business61',
              type: 'menu',
              children: []
            }
          ]
        },
        {
          routeName: 'Business7',
          title: 'Business7',
          uniqueTag: 'Business7',
          type: 'catalog',
          children: [
            {
              routeName: 'Business71',
              title: 'Business71',
              uniqueTag: 'Business71',
              type: 'menu',
              children: []
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  },
  {
    url: '/api/dictionary',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          typeDescription: '导航菜单类型',
          typeName: 'navigationMenuType',
          code: [
            {
              codeDescription: '导航分类',
              codeName: 'catalog',
              codeValue: 'catalog'
            },
            {
              codeDescription: '导航分组',
              codeName: 'group',
              codeValue: 'group'
            },
            {
              codeDescription: '导航菜单',
              codeName: 'menu',
              codeValue: 'menu'
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  }
]
