<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

/**
 * 查找当前菜单的父级分类 routeName
 * @param {Array} menu 菜单列表
 * @param {String} currentMenuKey 当前菜单的 key 值
 * @return 当前菜单的父级分类 routeName
 */
function findParentMenuKey(menu = [], currentMenuKey) {
  for (let i = 0; i < menu.length; i++) {
    const currentMenu = menu[i]

    if (currentMenu.routeName === currentMenuKey) {
      return currentMenuKey
    }

    if ('children' in currentMenu && currentMenu.children && currentMenu.children.length > 0) {
      const nextParentMenuKey = findParentMenuKey(currentMenu.children, currentMenuKey)
      if (nextParentMenuKey) {
        return currentMenu.routeName
      }
    }
  }

  return null
}

const NAVIGATION_TYPE = {
  CATALOG: 'catalog',
  MENU: 'menu'
}

const MenuIcon = (props, context) => (
  props.icon(props, context)
)

const MenuSlot = (props) => {
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
  const router = useRouter()
  const navigationMenu = props.menu

  return (
    navigationMenu.map((navigation) => {
      if (navigation.type === NAVIGATION_TYPE.CATALOG) {
        return (
          <a-sub-menu
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } />
          </a-sub-menu>
        )
      }

      if (navigation.type === NAVIGATION_TYPE.MENU) {
        return (
          <a-menu-item
            key={navigation.routeName}
            v-slots={{ default: () => <MenuSlot navigation={ navigation } /> }}
            onClick={ () => router.push({ name: navigation.routeName }) }
          />
        )
      }

      return null
    })
  )
}

// 递归菜单组件还是 jsx 好用
export default {
  name: 'TheNavigation',
  setup() {
    const route = useRoute()
    const store = useStore()
    const navigationMenu = computed(() => store.state.system.navigationMenu)
    const selectedMenuKeys = ref([])
    const openMenuKeys = ref([])

    onMounted(() => {
      // 高亮当前页面菜单
      selectedMenuKeys.value = [route.name]
      // 展开当前父级菜单
      const currentOpenMenuKey = [findParentMenuKey(navigationMenu.value, route.name)]
      if (currentOpenMenuKey) {
        openMenuKeys.value = currentOpenMenuKey
      }
    })

    return () => (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
        v-models={[[selectedMenuKeys.value, 'selectedKeys'], [openMenuKeys.value, 'openKeys']]}
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
