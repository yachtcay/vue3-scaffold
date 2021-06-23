// 获取服务端拥有的路由权限 MenuName 值变为一维数组的形式
export const getRspMenuTableKeys = (rspMenuTable = []) => {
  const keys = []
  for (let i = 0; i < rspMenuTable.length; i++) {
    const currentMenu = rspMenuTable[i]

    if ('MenuName' in currentMenu) {
      keys.push(currentMenu.MenuName)
    }

    if ('children' in currentMenu && currentMenu.children.length > 0) {
      keys.push(...getRspMenuTableKeys(currentMenu.children))
    }
  }

  return keys
}
