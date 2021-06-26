import * as utils from '@/utils/helper'
import { requiresAuthRoutes } from './router-table'

// 使导航菜单附加图标组件
function attachIcon(pickIconMapper, rspMenuTable) {
  for (let i = 0; i < rspMenuTable.length; i++) {
    const current = rspMenuTable[i]
    current.icon = pickIconMapper[current.routeName] || null

    if ('children' in current && current.children.length > 0) {
      attachIcon(pickIconMapper, current.children)
    }
  }

  return rspMenuTable
}

function getOnlyMenu(menu) {
  const menus = []
  for (let i = 0; i < menu.length; i++) {
    const currentMenu = menu[i]

    if (currentMenu.type === 'menu') {
      menus.push(currentMenu.routeName)
    }

    if (currentMenu.type !== 'menu' || (currentMenu.type === 'menu' && 'children' in currentMenu && currentMenu.children.length === 0)) {
      menus.push(...getOnlyMenu(currentMenu.children))
    }
  }

  return menus
}

// 获取服务端拥有的路由权限 MenuName 值变为对象的形式
export const getRspMenuTableKeys = (rspMenuTable = []) => utils.pickPropertyOfTree(rspMenuTable, 'routeName', 'routeName')

// 构成导航菜单，其中从路由表中附加图标组件
export const makeNavigationMenu = (rspMenuTable = []) => {
  const routeTable = requiresAuthRoutes
  const pickIconMapper = utils.pickPropertyOfTree(routeTable, 'icon', 'name')
  return attachIcon(pickIconMapper, rspMenuTable)
}

// 为了菜单导航，只获得 type 为 menu 的 routenName 一维数组
export const getNavigationOnlyMenu = (navigationMenu = []) => getOnlyMenu(navigationMenu)
