<template>
  <div class="tab-wrapper">
    <a-tabs v-model:activeKey="tabActiveKey" size="small" :tabBarStyle="{ 'padding-left': '16px' }" type="card" >
      <a-tab-pane class="tab-pane" v-for="pane in tabList" :key="pane.key" :closable="true">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span style="user-select: none;">
              {{ pane.title }}
              <ReloadOutlined v-show="tabActiveKey === pane.key" :spin="pane.spin" class="dropdown-menu-refresh-btn" @click="handleReload(pane)" />
              <CloseOutlined class="dropdown-menu-close-btn" />
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { MoreOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'

function makeTabRouteMenu(routeMatched = [], navigationOnlyMenuFlat = []) {
  let routeMenu = null
  for (let i = routeMatched.length - 1; i >= 0; i--) {
    const current = routeMatched[i]
    const findMenu = navigationOnlyMenuFlat.find((menu) => menu.routeName === current.name)
    if (findMenu) {
      routeMenu = {
        title: findMenu.title,
        routeName: current.name,
        ...current.meta
      }
    }
  }

  return routeMenu
}

export default {
  name: 'TheTabView',
  components: {
    MoreOutlined,
    CloseOutlined,
    ReloadOutlined
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const tabList = ref([{
      key: 1,
      title: 'title1',
      content: 'content1',
      spin: false
    }, { key: 2, title: 'title2', content: 'content2' }
    ])
    const tabActiveKey = ref(1)

    onMounted(() => {
      const routeMatched = route.matched
      const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
      const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)
      if (routeMenu) {
        store.dispatch('tab-views/add', routeMenu)
      }
    })

    // ...TODO
    watch(route, (viewRoute) => {
      const routeMatched = viewRoute.matched
      const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
      const routeMenu = makeTabRouteMenu(routeMatched, navigationOnlyMenuFlat)
      if (routeMenu) {
        store.dispatch('tab-views/add', routeMenu)
      }
    })

    return {
      tabList,
      tabActiveKey
    }
  },
  methods: {
    handleReload(pane) {
      console.log(pane)
      pane.spin = true
      window.setTimeout(() => {
        pane.spin = false
      }, 1000)
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
