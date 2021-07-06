const state = () => ({
  cacheViews: [],
  cacheViewsKey: []
})

const getters = {
}

const mutations = {
  ADD_VIEW: (state, viewRoute) => {
    if (state.cacheViewsKey.indexOf(viewRoute.routeName) === -1) {
      state.cacheViews.push(viewRoute)
      state.cacheViewsKey.push(viewRoute.routeName)
    }
  },

  DELETE_VIEW: (state, routeName) => {
    const findViewKeyIndex = state.cacheViewsKey.indexOf(routeName)
    if (findViewKeyIndex !== -1) {
      state.cacheViews.splice(findViewKeyIndex, 1)
      state.cacheViewsKey.splice(findViewKeyIndex, 1)
    }
  }
}

const actions = {
  add({ commit }, viewRoute) {
    commit('ADD_VIEW', viewRoute)
  },

  del({ commit }, routeName) {
    commit('DELETE_VIEW', routeName)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
