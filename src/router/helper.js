import * as utils from '@/utils/helper'
import { requiresAuthRoutes } from './router-table'

// 使导航菜单附加图标组件

/**
 * 获取附加了图标组件的菜单
 * @param {Array} pickIconMapper 获取带图标的数
 * @param {Array}} rspMenuTable 后端传入的菜单
 * @returns 附加了图标组件的菜单
 */
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

/**
 * 获取片平化处理过的菜单树(一位数组)
 * @param {Array} menu 菜单树
 * @param {Array} includeType 包含的菜单类型
 * @param {Function} filterFn 对子菜单的过滤条件
 * @returns 片平化处理过的菜单树
 */
function getMenuFlat(menu, includeType = [], filterFn = () => true) {
  const menusFlat = []
  for (let i = 0; i < menu.length; i++) {
    const currentMenu = menu[i]

    if (includeType.length > 0) {
      if (includeType.indexOf(currentMenu.type) !== -1) {
        menusFlat.push({
          routeName: currentMenu.routeName,
          title: currentMenu.title,
          type: currentMenu.type
        })
      }
    } else {
      menusFlat.push({
        routeName: currentMenu.routeName,
        title: currentMenu.title,
        type: currentMenu.type
      })
    }

    if (filterFn(menu, includeType, currentMenu) && 'children' in currentMenu && currentMenu.children.length > 0) {
      menusFlat.push(...getMenuFlat(currentMenu.children, includeType, filterFn))
    }
  }

  return menusFlat
}

// 获取服务端拥有的路由权限 MenuName 值变为对象的形式
export const getRspMenuTableKeys = (rspMenuTable = []) => utils.pickPropertyOfTree(rspMenuTable, 'routeName', 'routeName')

// 构成导航菜单，其中从路由表中附加图标组件
export const makeNavigationMenu = (rspMenuTable = []) => {
  const routeTable = requiresAuthRoutes
  const pickIconMapper = utils.pickPropertyOfTree(routeTable, 'icon', 'name')
  return attachIcon(pickIconMapper, rspMenuTable)
}

// 为了菜单导航，只获得 type 为 menu 的 routenName 一维数组，其中过滤了当 type = menu 时，还有 children 的菜单
export const getNavigationOnlyMenuFlat = (navigationMenu = []) => getMenuFlat(navigationMenu, ['menu'], (menu, includeType, currentMenu) => currentMenu.type !== 'menu')

// 为了菜单导航，获得所有路由类型的 routenName 一维数组
export const getNavigationFlat = (navigationMenu = []) => getMenuFlat(navigationMenu)
