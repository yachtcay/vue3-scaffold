'use strict'

const path = require('path')

// 是否使用 mock
const mockMode = true

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, //process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 使用 mock 不进行代理
    proxy: mockMode ? null : {
      '/api': {
        target: process.env.VUE_APP_REQUEST_BASE,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_APP_REQUEST_BASE,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      },
    },
    before: mockMode ? require('./mock/server') : null
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack(config) {
    config
    .when(process.env.NODE_ENV !== 'development',
      config => {
        config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 仅打包初始化中的第三方依赖包
            },
            antDesignVue: {
              name: 'chunk-ant-design-vue',
              priority: 20,
              test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3,
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
      }
    )
  }
}