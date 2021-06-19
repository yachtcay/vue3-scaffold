import * as api from '@/api/user'

const state = () => ({
  user: null
})

const getters = {
  userInfo(state) {
    return state.user
  }
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

const actions = {
  async getUser({ commit }) {
    try {
      const { data } = await api.queryUser()
      commit('SET_USER', data)

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
