const defaultTheme = require('ant-design-vue/dist/default-theme')
const deepBlueTheme = require('./deep-blue/index')

function getThemeVariables(options = {}) {
  let themeVar = {
    // eslint-disable-next-line quote-props
    'hack': `true;@import "${require.resolve('ant-design-vue/lib/style/color/colorPalette.less')}";`,
    ...defaultTheme
  }

  if (options.deepBlue) {
    themeVar = {
      ...themeVar,
      ...deepBlueTheme
    }
  }

  return themeVar
}

module.exports = {
  getThemeVariables
}
