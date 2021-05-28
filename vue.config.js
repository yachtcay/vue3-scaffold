'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_REQUEST_BASE,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_REQUEST_BASE,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    }
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