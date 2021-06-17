<template>
  <!-- sider menu -->
  <a-layout class="main-layout-container">
    <a-layout-sider>
      <navigation />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>

  <!-- header menu -->
  <!-- <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout-content>Content</a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout> -->

  <!-- mix menu -->
  <!-- <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout> -->
</template>

<script>
import Navigation from './components/TheNavigation'

export default {
  name: 'MainLayout',
  components: {
    Navigation
  }
}
</script>

<style lang="less">
  .main-layout-container {
    height: 100vh;
    color: #fff;
  }
</style>
