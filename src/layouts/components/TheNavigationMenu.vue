<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as utils from '@/utils/helper'

/**
 * 获取当前高亮菜单的 route name
 * @param {Array} routeMatched route 中的 routeMatched
 * @param {Array} navigationOnlyMenuFlat 扁平化过的菜单树
 * @returns 当前高亮菜单的 route name
 */
function findCurrentMenuKeys(routeMatched = [], navigationOnlyMenuFlat = []) {
  const currentKeys = []
  for (let i = 0; i < routeMatched.length; i++) {
    const currentRouteMatched = routeMatched[i]

    for (let n = 0; n < navigationOnlyMenuFlat.length; n++) {
      const currentMenu = navigationOnlyMenuFlat[n]

      if (currentRouteMatched.name === currentMenu.routeName) {
        currentKeys.push(currentMenu.routeName)
      }
    }
  }

  return currentKeys
}

/**
 * 获取当前菜单所处分类中，父类的 key
 * @param {Array} navigationPath 当前菜单的路径
 * @returns 当前菜单所处分类中，父类的 key 集合
 */
function findParentMenuKeys(navigationPath = []) {
  const parentMenuKeys = []
  for (let i = 0; i < navigationPath.length; i++) {
    const current = navigationPath[i]
    if (current.type === 'catalog') {
      parentMenuKeys.push(current.routeName)
    }
  }

  return parentMenuKeys
}

const NAVIGATION_TYPE = {
  CATALOG: 'catalog',
  MENU: 'menu',
  GROUP: 'group'
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

      if (navigation.type === NAVIGATION_TYPE.GROUP) {
        return (
          <a-menu-item-group
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } />
          </a-menu-item-group>
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
      const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
      const currentMenuKeys = findCurrentMenuKeys(route.matched.reverse(), navigationOnlyMenuFlat)
      selectedMenuKeys.value = currentMenuKeys

      // 展开当前父级菜单
      openMenuKeys.value = findParentMenuKeys(utils.findTreeNodePath(store.state.system.navigationMenu, 'routeName', route.name))
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
