import * as api from '@/api/auth'

const state = () => ({
  token: null
})

const getters = {
  token(state) {
    return state.token
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const { data } = await api.login({ username, password })
      commit('SET_TOKEN', data.token)

      return Promise.resolve()
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
