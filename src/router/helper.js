import {
  MailOutlined
} from '@ant-design/icons-vue'

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

export const attachIcon = (data) => {
  for (let i = 0; i < data.length; i++) {
    const current = data[i]

    current.componentOfIcon = MailOutlined

    if ('children' in current && current.children.length > 0) {
      attachIcon(current.children)
    }
  }

  return data
}
