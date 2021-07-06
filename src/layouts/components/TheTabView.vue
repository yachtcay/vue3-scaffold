<template>
  <div class="tab-wrapper">
    <a-tabs :activeKey="tabActiveKey" size="small" :tabBarStyle="{ 'padding-left': '16px' }" type="card" @change="handleChangeTab">
      <a-tab-pane class="tab-pane" v-for="pane in tabList" :key="pane.routeName" :closable="true">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="user-select: none;">
              {{ pane.title }}
              <ReloadOutlined v-show="tabActiveKey === pane.routeName" :spin="pane.spin" class="dropdown-menu-refresh-btn" @click="handleReload(pane)" />
              <CloseOutlined v-show="!pane.fixed" class="dropdown-menu-close-btn" />
            </span>

            <template #overlay>
              <a-menu>
                <a-menu-item key="1">关闭其他</a-menu-item>
                <a-menu-item key="2">关闭到左侧</a-menu-item>
                <a-menu-item key="3">关闭到右侧</a-menu-item>
                <a-menu-item key="3">刷新当前页</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
      <template #tabBarExtraContent>
        <a-dropdown>
          <MoreOutlined class="dropdown-menu-btn" />

          <template #overlay>
            <a-menu>
              <a-menu-item>关闭其他</a-menu-item>
              <a-menu-item>刷新当前页</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
    <div class="breadcrumb-wrapper" style="padding: 0 24px 16px 24px; ">
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Application Center</a-breadcrumb-item>
        <a-breadcrumb-item>Application List</a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import useTabView from '../composables/useTabView'

export default {
  name: 'TheTabView',
  components: {
    MoreOutlined,
    CloseOutlined,
    ReloadOutlined
  },
  setup() {
    const store = useStore()
    useTabView()

    return {
      tabList: computed(() => store.state['tab-views'].cacheViews),
      tabActiveKey: computed(() => store.state['tab-views'].activeViewKey)
    }
  },
  methods: {
    refresh() {
      this.$router.replace({
        path: `/redirect${this.$route.fullPath}`,
        test: 123
      })
    },

    handleReload(pane) {
      this.refresh()
      pane.spin = true
      window.setTimeout(() => {
        pane.spin = false
      }, 1000)
    },

    handleRefreshCurrent() {
      this.refresh()
    },

    handleChangeTab(activeRouteName) {
      this.$store.dispatch('tab-views/active', activeRouteName)
      this.$router.push({
        name: activeRouteName
      })
    },

    handleCloseCurrent() {
    },

    handleCloseOther() {
    },

    handleCloseAllToTheLeft() {
    },

    handleCloseAllToTheRight() {
    }
  }
}
</script>

<style lang="less" scoped>
  .content-container {
    height: calc(100vh - 48px);
    overflow: auto;

    .tab-wrapper {
      margin: 0px;
      padding-top: 6px;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12),0 0 3px 0 rgba(0,0,0,.04);

      .tab-pane {
        overflow: hidden;
        position: absolute;
      }

      .dropdown-menu-refresh-btn,
      .dropdown-menu-close-btn {
        margin-right: 0; margin-left: 8px; color: rgba(0,0,0,.45); font-size: 12px;
      }

      .dropdown-menu-btn {
        cursor: pointer;
        margin-right: 8px;
        padding: 12px;
        font-size: 16px;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>
