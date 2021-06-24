<template>
  <a-layout v-if="isSideMenu" class="side-menu-main-layout-container">
    <a-layout-sider width="210">
      <div class="logo">logo</div>
      <div class="navigation">
        <navigation-menu />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { layoutType as layoutTypeConsts } from '@/consts'
import NavigationMenu from './components/TheNavigationMenu'

export default {
  name: 'NavigationSiderLayout',
  components: {
    NavigationMenu,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  computed: {
    ...mapState('settings', {
      isSideMenu: (state) => state.layoutType === layoutTypeConsts.SIDE_MENU,
      isTopMenu: (state) => state.layoutType === layoutTypeConsts.TOP_MENU,
      isMixMenu: (state) => state.layoutType === layoutTypeConsts.MIX_MENU
    })
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed() {}
  }
}
</script>

<style lang="less" scoped>
  .side-menu-main-layout-container {
    color: #fff;
    height: 100vh;

    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .logo {
      position: relative;
      display: flex;
      align-items: center;
      padding: 16px 16px;
      line-height: 32px;
      cursor: pointer;
    }

    .navigation {
      flex: 1 1 0%;
      overflow: hidden auto;
    }

    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
</style>
