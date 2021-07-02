# vue3-scaffold
按照个人喜好搭建的一套基于 Vue3 和 AntdV 的前端脚手架，不接受 PR，不定期更新，主要用于交流学习

# TODO
布局参考 [Ant Design Pro](https://store.antdv.com/pro/preview/workplace)

## 布局
- [x] 可选 Side Menu Layout
- [x] 可选 Top Menu Layout
- [x] 可选 Mix Menu Layout
- [ ] 可配置导航 Tabs (所有页面 Tab 带刷新功能。除固定页面外，其他页面可以关闭) 支持单击右键菜单实现，“关闭其他”，“关闭到左侧”，“关闭到右侧”，“刷新当前页”
- [x] 自定义一套深蓝色主题

## 组件
- [ ] Crud

## 其他
- [X] Mock
- [ ] 模板生成

# 后端数据响应体约定
和后端的兄弟约定的数据响应结构体示例

```js
{
  code: 20000,  // 自定义的业务码
  data: [],     // 响应的数据，可以是 Array Object String Number Boolean
  message: null,  // 响应数据的提示信息
  success: true // 当前业务请求是否成功
}
```