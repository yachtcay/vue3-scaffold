<script>
import { mapState } from 'vuex'
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

const NAVIGATION_TYPE = {
  CATALOG: 'catalog',
  MENU: 'menu'
}

const renderSubMenuSlot = (title) => (
  <span>{ title }</span>
)

const renderNavigationMenu = (navigationMenu = []) => (
  navigationMenu.map((navigation) => {
    if (navigation.type === NAVIGATION_TYPE.CATALOG) {
      return (
        <a-sub-menu
          key={navigation.routeName}
          v-slots={{ title: () => renderSubMenuSlot(navigation.title) }}
        >
          {
            renderNavigationMenu(navigation.children)
          }
        </a-sub-menu>
      )
    }

    if (navigation.type === NAVIGATION_TYPE.MENU) {
      return <a-menu-item key={navigation.routeName}>{ navigation.title }</a-menu-item>
    }

    return null
  })
)

// 递归菜单组件还是 jsx 好用
export default {
  render() {
    return (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
      >
        {
          renderNavigationMenu(this.navigationMenu)
        }
      </a-menu>
    )
  },
  name: 'TheNavigation',
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined
  },
  computed: {
    ...mapState('system', {
      navigationMenu: (state) => state.navigationMenu
    })
  }
}
</script>

<style lang="less">
  .ant-menu {
    &,
    & * {
      user-select: none;
    }
  }
</style>
