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

const MenuIcon = (props, context) => (
  props.icon(props, context)
)

const renderSubMenuSlot = (navigation) => (
  <span>
    {
      navigation.icon ? <MenuIcon icon={navigation.icon} /> : null
    }
    <span>{ navigation.title }</span>
  </span>
)

const renderNavigationMenu = (navigationMenu = []) => (
  navigationMenu.map((navigation) => {
    if (navigation.type === NAVIGATION_TYPE.CATALOG) {
      return (
        <a-sub-menu
          key={navigation.routeName}
          v-slots={{ title: () => renderSubMenuSlot(navigation) }}
        >
          {
            renderNavigationMenu(navigation.children)
          }
        </a-sub-menu>
      )
    }

    if (navigation.type === NAVIGATION_TYPE.MENU) {
      return (
        <a-menu-item
          key={navigation.routeName}
          v-slots={{ default: () => renderSubMenuSlot(navigation) }}
        />
      )
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

<style lang="less" scoped>
  .ant-menu {
    &,
    & * {
      user-select: none;
    }
  }
</style>
