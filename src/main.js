// 引入 antd
import Antd from 'ant-design-vue'
// 默认主题
// import './theme/default/index.less'
// 自定义深蓝色主题
import './theme/deep-blue/index.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app')
