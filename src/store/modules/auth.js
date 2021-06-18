import * as api from '@/api/auth'

const state = () => ({
  token: null
})

const getters = () => {
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      api.login({
        username,
        password
      }).then(({ data }) => {
        commit('SET_TOKEN', data.token)
        resolve()
      }, (error) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
