module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          id: 'f8fb7db1-e07c-0c2b-b216-d0b0bba34ad9',
          routeName: 'Home',
          title: '首页',
          type: 'menu',
          children: []
        },
        {
          id: 'fa11752d-e658-02b5-227f-3c1042ccd8e1',
          routeName: 'Example',
          title: 'Example',
          type: 'catalog',
          children: [
            {
              id: '8c4bd3da-e85b-fa63-fd7b-2c9bd8d3c435',
              routeName: 'Example1',
              title: 'Example1',
              type: 'menu',
              children: []
            },
            {
              id: 'b3bfb9f2-c40f-e943-21cd-6e4398f5ea2d',
              routeName: 'Example2',
              title: 'Example2',
              type: 'menu',
              children: []
            },
            {
              id: '57154c53-9ce2-6493-8f84-760b669ee500',
              routeName: 'Example3',
              title: 'Example3',
              type: 'menu',
              children: []
            },
            {
              id: 'b530e5a3-13fd-9305-5c23-3154a78157fe',
              routeName: 'Example4',
              title: 'Example4',
              type: 'menu',
              children: [
                {
                  id: 'ca1b79b3-0131-6262-9b47-54b509fceee3',
                  routeName: 'Example4List',
                  title: 'Example4List',
                  type: 'menu',
                  children: []
                },
                {
                  id: '6e1fdcb0-5ec9-643b-e529-fb702ec05f5b',
                  routeName: 'Example4Detail',
                  title: 'Example4Detail',
                  type: 'menu',
                  children: []
                }
              ]
            },
            {
              id: '165ccf57-9a33-401e-455e-815a45d82f31',
              routeName: '',
              title: 'Example5',
              type: 'group',
              children: [
                {
                  id: '5beb4c79-c711-b3b9-5b82-835e2b90729e',
                  routeName: 'Example5',
                  title: 'Example5',
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
