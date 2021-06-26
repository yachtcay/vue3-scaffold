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

// 获取服务端拥有的路由权限 MenuName 值变为对象的形式
export const getRspMenuTableKeys = (rspMenuTable = []) => utils.pickPropertyOfTree(rspMenuTable, 'routeName', 'routeName')

// 构成导航菜单，其中从路由表中附加图标组件
export const makeNavigationMenu = (rspMenuTable = []) => {
  const routeTable = requiresAuthRoutes
  const pickIconMapper = utils.pickPropertyOfTree(routeTable, 'icon', 'name')
  return attachIcon(pickIconMapper, rspMenuTable)
}
