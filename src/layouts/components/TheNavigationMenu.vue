<script>
import {
  ref,
  onMounted,
  onDeactivated,
  nextTick
} from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as utils from '@/utils/helper'
import * as consts from '@/consts'

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
function findParentMenuKeys(navigationPath = [], catelogTypeValue) {
  const parentMenuKeys = []
  for (let i = 0; i < navigationPath.length; i++) {
    const current = navigationPath[i]
    if (current.type === catelogTypeValue) {
      parentMenuKeys.push(current.routeName)
    }
  }

  return parentMenuKeys
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
  const navigationMapper = props.navigationMenuMapper

  return (
    navigationMenu.map((navigation) => {
      if (navigation.type === navigationMapper.catalog.codeValue) {
        return (
          <a-sub-menu
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </a-sub-menu>
        )
      }

      if (navigation.type === navigationMapper.group.codeValue) {
        return (
          <a-menu-item-group
            key={navigation.routeName}
            v-slots={{ title: () => <MenuSlot navigation={navigation} /> }}
          >
            <Menu menu={ navigation.children } navigationMenuMapper={ navigationMapper } />
          </a-menu-item-group>
        )
      }

      if (navigation.type === navigationMapper.menu.codeValue) {
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
  name: 'NavigationMenu',
  setup() {
    const route = useRoute()
    const store = useStore()
    const navigationMenu = ref(store.getters['system/navigationMenu']) // computed(() => store.state.system.navigationMenu)
    const selectedMenuKeys = ref([])
    const openMenuKeys = ref([])
    const navigationMenuMapper = store.getters['system/getDictionaryTypeMapper']('navigationMenuType')
    const menuRef = ref(null)
    // top layout
    const menuLiWidth = []

    const reBuildMenu = async () => {
      await nextTick()
      const menuUlWidth = menuRef.value.parentElement.offsetWidth
      let splitIndex = 0

      for (let i = 0, liTotalWidth = 0; i < menuLiWidth.length; i++) {
        liTotalWidth += menuLiWidth[i]

        if (liTotalWidth + 56 > menuUlWidth) {
          if (i > 1) {
            splitIndex = i
          }

          break
        }
      }

      if (splitIndex !== 0) {
        navigationMenu.value = store.getters['system/navigationMenuForTopLayout'](splitIndex)
      }
    }

    onMounted(async () => {
      // 如果是 top 布局，那么重新组织 menu 结构
      if (store.state.settings.layoutType === consts.layoutType.TOP_MENU) {
        await nextTick()
        const liNodes = menuRef.value.parentElement.querySelectorAll('li')
        for (let i = 0; i < liNodes.length; i++) {
          menuLiWidth.push(liNodes[i].offsetWidth)
        }
        reBuildMenu()

        window.addEventListener('resize', reBuildMenu)
      }

      // 高亮当前页面菜单
      const navigationOnlyMenuFlat = store.getters['system/navigationOnlyMenuFlat']
      const currentMenuKeys = findCurrentMenuKeys(route.matched.reverse(), navigationOnlyMenuFlat)
      selectedMenuKeys.value = currentMenuKeys

      // 展开当前父级菜单
      if (store.state.settings.layoutType === consts.layoutType.SIDE_MENU
      || store.state.settings.layoutType === consts.layoutType.MIX_MENU) {
        openMenuKeys.value = findParentMenuKeys(
          utils.findTreeNodePath(store.state.system.navigationMenu, 'routeName', route.name),
          store.getters['system/getDictionaryValue']('navigationMenuType', 'catalog')
        )
      }
    })

    onDeactivated(() => {
      if (store.state.settings.layoutType === consts.layoutType.TOP_MENU) {
        window.removeEventListener('resize', reBuildMenu)
      }
    })

    return () => (
      <a-menu
        theme="dark" // 没有像 V2 版本一样没有设置 v-bind="$attrs" 但是也会覆盖
        mode="inline"
        v-models={[[selectedMenuKeys.value, 'selectedKeys'], [openMenuKeys.value, 'openKeys']]}
      >
        <Menu ref={menuRef} menu={ navigationMenu.value } navigationMenuMapper={ navigationMenuMapper } />
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
