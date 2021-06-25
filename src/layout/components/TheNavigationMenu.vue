<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

const NAVIGATION_TYPE = {
  CATALOG: 'catalog',
  MENU: 'menu'
}

const MenuIcon = (props, context) => (
  props.icon(props, context)
)

const SubMenuSlot = (props) => {
  const { navigation } = props
  return (
    <span>
      {
        navigation.icon ? <MenuIcon icon={navigation.icon} /> : null
      }
      <span>{ navigation.title }</span>
    </span>
  )
}

const Menu = (props) => {
  const navigationMenu = props.menu
  return (
    navigationMenu.map((navigation) => {
      if (navigation.type === NAVIGATION_TYPE.CATALOG) {
        return (
          <a-sub-menu
            key={navigation.routeName}
            v-slots={{ title: () => <SubMenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } />
          </a-sub-menu>
        )
      }

      if (navigation.type === NAVIGATION_TYPE.MENU) {
        return (
          <a-menu-item
            key={navigation.routeName}
            v-slots={{ default: () => <SubMenuSlot navigation={ navigation } /> }}
          />
        )
      }

      return null
    })
  )
}

// 递归菜单组件还是 jsx 好用
export default {
  render() {
    return (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
      >
        <Menu menu={ this.navigationMenu } />
      </a-menu>
    )
  },
  name: 'TheNavigation',
  setup() {
    const store = useStore()
    const navigationMenu = computed(() => store.state.system.navigationMenu)

    return () => (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
      >
        <Menu menu={ navigationMenu.value } />
      </a-menu>
    )
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
