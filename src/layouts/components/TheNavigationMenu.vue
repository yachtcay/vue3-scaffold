<script>
import {
  ref,
  onMounted,
  nextTick
} from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as utils from '@/utils/helper'
import * as consts from '@/consts'

/**
 * 根据布局样式宽度获得分隔菜单时候的分隔索引
 * @param {Object} 菜单 ref 值
 * @return 获取最佳分隔菜单的索引
 */
function findSplitIndex(menuRef) {
  const menuUlElement = menuRef.parentElement
  const menuLiElement = menuUlElement.querySelectorAll('li')
  const menuUlWidth = menuUlElement.offsetWidth
  let menuLiTotalWidth = 0
  let splitIndex = 0

  for (let i = 0; i < menuLiElement.length; i++) {
    menuLiTotalWidth += menuLiElement[i].offsetWidth

    if (menuLiTotalWidth > menuUlWidth) {
      if (i > 1) {
        splitIndex = i - 1
      }
      break
    }
  }

  return splitIndex
}

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
  name: 'TheNavigation',
  setup() {
    const route = useRoute()
    const store = useStore()
    const navigationMenu = ref(store.getters['system/navigationMenu']) // computed(() => store.state.system.navigationMenu)
    const selectedMenuKeys = ref([])
    const openMenuKeys = ref([])
    const navigationMenuMapper = store.getters['system/getDictionaryTypeMapper']('navigationMenuType')
    const menuRef = ref(null)

    onMounted(async () => {
      // 如果是 top 布局，那么重新组织 menu 结构
      await nextTick()
      if (store.state.settings.layoutType === consts.layoutType.TOP_MENU) {
        const splitIndex = findSplitIndex(menuRef.value)
        if (splitIndex !== 0) {
          navigationMenu.value = store.getters['system/navigationMenuForTopLayout'](splitIndex)
        }
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
