import _ from 'lodash'

/**
 * 在组件使用中，需要使用节流，用这个方法来包裹事件即可，不要使用在组件中，详情见 Vue 官方文档
 * https://v3.cn.vuejs.org/guide/data-methods.html#%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81
 * @param {Function} cb 需要使用节流的函数
 * @param {Number} millisecond 节流间隔毫秒数
 * @param {Object} opts lodash 中节流的参数
 * @returns 节流事件函数
 */
export const throttle = (cb, millisecond = 3000, opts = {
  leading: true,
  trailing: false
}) => _.throttle(function (...args) {
  cb && cb.call(this, ...args)
}, millisecond, opts)

/**
 * 在组件使用中，需要使用防抖，用这个方法来包裹事件即可，不要使用在复用组件中，详情见 Vue 官方文档
 * https://v3.cn.vuejs.org/guide/data-methods.html#%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81
 * @param {Function} cb 需要使用防抖的函数
 * @param {Number} millisecond 防抖间隔毫秒数
 * @param {Object} opts lodash 中防抖的参数
 * @returns 防抖事件函数
 */
export const debounce = (cb, millisecond = 300, opts = {
  leading: true,
  trailing: false
}) => _.debounce(function (...args) {
  cb && cb.call(this, ...args)
}, millisecond, opts)
