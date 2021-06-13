/* eslint-disable */
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const chokidar = require('chokidar')
const chalk = require('chalk')

function getMockMetadata(mockFileDirectory) {
  const mockMetadata = []
  const mockFiles = fs.readdirSync(mockFileDirectory).filter((fileName) => path.extname(fileName) === '.js')

  mockFiles.forEach((mockFile) => {
    mockMetadata.push(require(mockFileDirectory + '/' + mockFile))
  })

  return _.flattenDeep(mockMetadata)
}

function makeFakeRoutes(app, mockMetadata = []) {
  let mockLength = 0
  let mockLastIndex = 0

  mockMetadata.forEach((mock) => {
    app[mock.type](mock.url, mock.response)
    // 动态添加 route 索引跟着改变，如果放方法体外，会有代码执行先后关系，所以每次循环就进行赋值
    mockLastIndex = app._router.stack.length
  })

  return {
    mockLength: mockMetadata.length,
    mockStartIndex: mockLastIndex - mockLength
  }
}

module.exports = (app) => {
  const mockFileDirectory = path.join(process.cwd(), '/mock/request')
  let { mockLength, mockStartIndex } = makeFakeRoutes(app, getMockMetadata(mockFileDirectory))

  // 参考 https://github.com/PanJiaChen/vue-element-admin/blob/master/mock/mock-server.js
  chokidar.watch(mockFileDirectory, {
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockLength)

        const mockRoutes = makeFakeRoutes(app, getMockMetadata(mockFileDirectory))
        mockLength = mockRoutes.mockLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server 热启动成功! 路径为  ${path}`))
      } catch (error) {
        console.error(chalk.redBright(error))
      }
    }
  })
}
