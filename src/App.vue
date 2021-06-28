<template>
  <div id="app-container">
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less" scoped>
  #app {
    height: 100%;
  }
</style>
