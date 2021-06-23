<template>
  <component :is="navigationComponent" class="main-layout"></component>
</template>

<script>
import { mapState } from 'vuex'
import { layoutType as layoutTypeConsts } from '@/consts'
import NavigationSiderLayout from './navigation-sider-layout.vue'
import NavigationTopLayout from './navigation-top-layout.vue'
import NavigationMixLayout from './navigation-mix-layout.vue'

export default {
  name: 'MainLayout',
  components: {
    NavigationSiderLayout,
    NavigationTopLayout,
    NavigationMixLayout
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('settings', {
      navigationComponent: (state) => {
        const componentsMapper = []
        componentsMapper[layoutTypeConsts.SIDE_MENU] = 'navigation-sider-layout'
        componentsMapper[layoutTypeConsts.TOP_MENU] = 'navigation-top-layout'
        componentsMapper[layoutTypeConsts.MIX_MENU] = 'navigation-mix-layout'

        return componentsMapper[state.layoutType]
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="less">
  .main-layout {
    // 自定义滚动条样式，只支持 webkit 浏览器
    .ant-layout-sider-children ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    .ant-layout-sider-children ::-webkit-scrollbar-thumb {
      background: hsla(0,0%,100%,.2);
      border-radius: 3px;
      box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
    }

    .ant-layout-sider-children ::-webkit-scrollbar-track {
      background: hsla(0,0%,100%,.15);
      border-radius: 3px;
      box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
    }
  }
</style>
