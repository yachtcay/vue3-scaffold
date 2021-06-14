/* eslint-disable */
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const Mock = require('mockjs')
const express = require('express')

function getMockMetadata(mockFileDirectory) {
  const mockMetadata = []
  const mockFiles = fs.readdirSync(mockFileDirectory).filter((fileName) => path.extname(fileName) === '.js')

  mockFiles.forEach((mockFile) => {
    mockMetadata.push(require(mockFileDirectory + '/' + mockFile))
  })

  return _.flattenDeep(mockMetadata)
}

function makeFakeRoutes(app, mockMetadata = []) {
  const mocksForServer = mockMetadata.map(route => {
    const { url, type, response } = route

    return {
      url: url,
      type: type || 'get',
      respond(req, rsp) {
        rsp.json(Mock.mock(response instanceof Function ? response(req, rsp) : response))
      }
    }
  })

  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.respond)
  }
}

module.exports = (app, server) => {
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }))

  const mockFileDirectory = path.join(process.cwd(), '/mock/request')
  makeFakeRoutes(app, getMockMetadata(mockFileDirectory))
}
