import * as api from '@/api/system'
import { getRspMenuTableKeys, makeNavigationMenu, getNavigationOnlyMenu } from '@/router/helper'

const state = () => ({
  navigationMenu: [],
  requiresAuthMenuOfKeys: []
})

const getters = {
  authMenuKeys(state) {
    return state.requiresAuthMenuOfKeys
  },

  navigationOnlyMenu(state) {
    return getNavigationOnlyMenu(state.navigationMenu)
  }
}

const mutations = {
  SET_NAVIGATION_MENU(state, menu) {
    state.navigationMenu = menu
  },

  SET_REQUIRES_AUTH_MENU_OF_KEYS(state, keys) {
    state.requiresAuthMenuOfKeys = keys
  }
}

const actions = {
  async buildNavigationMenu({ commit }) {
    try {
      const { data } = await api.queryMenu()
      commit('SET_NAVIGATION_MENU', makeNavigationMenu(data))
      commit('SET_REQUIRES_AUTH_MENU_OF_KEYS', getRspMenuTableKeys(data))

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
