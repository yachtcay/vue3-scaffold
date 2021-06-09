# vue3-scaffold
按照个人喜好搭建的一套基于 Vue3 和 AntdV 的前端脚手架，不定期更新

# 后端数据响应体
和后端的兄弟沟通后端数据响应结构体示例

```js
{
  code: 20000,  // 自定义的业务码
  data: [],     // 响应的数据，可以是 Array Object String Number Boolean
  message: '',  // 响应数据的提示信息
  success: true // 当前业务请求是否成功
}
```

# TODO
布局能力参照 Ant Design Pro 实现

## 布局
- [x] 自定义深蓝色主题
- [ ] 可配置 Side Menu Layout
- [ ] 可配置 Side Menu Layout
- [ ] 可配置 Top Menu Layout
- [ ] 可配置 Mix Layout
- [ ] 可配置固定 Header
- [ ] 可配置固定 Sidebar
- [ ] 可配置 Tabs (所有页面 Tab 带刷新功能，除了 Home 页面，其他页面可以关闭) 支持单击右键菜单实现关闭其他，关闭到左侧，关闭到右侧，刷新当前页
- [ ] 可配置固定 Tabs

## 组件
- [ ] Crud

## 其他
- [ ] Mock
- [ ] 模板生成