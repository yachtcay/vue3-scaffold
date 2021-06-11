<template>
  <a-layout class="main-layout-container">
    <a-layout-sider>Sider</a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style lang="less">
  .main-layout-container {
    height: 100vh;
  }
</style>
