import * as api from '@/api/system'
import { getRspRouteTableKeys } from '@/router/helper'

const state = () => ({
  navigationMenu: [],
  requiresAuthRoutesOfKeys: []
})

const getters = {
  authRouteKeys(state) {
    return state.requiresAuthRoutesOfKeys
  }
}

const mutations = {
  SET_NAVIGATION_MENU(state, menu) {
    state.navigationMenu = menu
  },

  SET_REQUIRES_AUTH_ROUTES_OF_KEYS(state, keys) {
    state.requiresAuthRoutesOfKeys = keys
  }
}

const actions = {
  async buildNavigationMenu({ commit }) {
    try {
      const { data } = await api.queryMenu()
      commit('SET_NAVIGATION_MENU', data)
      commit('SET_REQUIRES_AUTH_ROUTES_OF_KEYS', getRspRouteTableKeys(data))

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
