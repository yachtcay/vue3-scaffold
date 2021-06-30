<template>
  <a-layout class="mix-layout-container">
    <a-layout-header class="header" theme="dark">
      <div class="header-wrapper">
        <div class="header-part1"></div>
        <div class="header-part2">
          <header-control />
        </div>
      </div>
    </a-layout-header>
    <a-layout class="base-container">
      <a-layout-sider class="side-nav-container" theme="light" v-model:collapsed="collapsed" :trigger="null" collapsible width="210">
        <div class="navigation">
          <navigation-menu theme="light" />
        </div>
        <div class="bottom-link">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import NavigationMenu from './components/TheNavigationMenu'
import HeaderControl from './components/TheHeaderControl.vue'

export default {
  name: 'NavigationMixLayout',
  components: {
    NavigationMenu,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HeaderControl
  },
  setup() {
    const collapsed = ref(false)

    return {
      collapsed
    }
  }
}
</script>

<style lang="less" scoped>
  :deep(.ant-layout-sider-children ::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
  }

  :deep(.ant-layout-sider-children ::-webkit-scrollbar-thumb) {
    background: rgba(0,0,0,.12);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
  }

  :deep(.ant-layout-sider-children ::-webkit-scrollbar-track) {
    background: rgba(0,0,0,.06);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
  }

  :deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .mix-layout-container {
    .header {
      padding: 0px;
      height: 48px;
      line-height: 48px;
      width: 100%;
      color: #fff;
      z-index: 99;
      right: 0px;

      .header-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        .header-part1 {
          flex: 1 1 0%;
          height: 100%;
        }

        .header-part2 {
        }
      }
    }

    .base-container {
      height: calc(100vh - 48px);

      .side-nav-container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .navigation {
          flex: 1 1 0%;
          overflow: hidden auto;
        }

        .bottom-link {
          width: 100%;
          display: flex;
          align-items: center;

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
      }
    }
  }
</style>
