// 获取服务端拥有的路由权限 routeName 值变为一维数组的形式
export const getRspRouteTableKeys = (rspRouteTable = []) => {
  const keys = []
  for (let i = 0; i < rspRouteTable.length; i++) {
    const currentRoute = rspRouteTable[i]

    if ('routeName' in currentRoute) {
      keys.push(currentRoute.routeName)
    }

    if ('children' in currentRoute && currentRoute.children.length > 0) {
      keys.push(...getRspRouteTableKeys(currentRoute.children))
    }
  }

  return keys
}
