const state = () => ({
  cacheViews: [],
  cacheViewsKey: [],
  activeViewKey: ''
})

const getters = {
}

const mutations = {
  ADD_VIEW: (state, viewRoute) => {
    if (state.cacheViewsKey.indexOf(viewRoute.routeName) === -1) {
      state.cacheViews.push(viewRoute)
      state.cacheViewsKey.push(viewRoute.routeName)
      state.activeViewKey = viewRoute.routeName
    }
  },

  DELETE_VIEW: (state, routeName) => {
    const findViewKeyIndex = state.cacheViewsKey.indexOf(routeName)
    if (findViewKeyIndex !== -1) {
      state.cacheViews.splice(findViewKeyIndex, 1)
      state.cacheViewsKey.splice(findViewKeyIndex, 1)
    }
  },

  ACTIVE_VIEW: (state, routeName) => {
    state.activeViewKey = routeName
  }
}

const actions = {
  init({ commit, rootGetters }) {
    let fixedIndexCount = -1
    const navigationOnlyMenuFlat = rootGetters['system/navigationOnlyMenuFlat']
    for (let i = 0; i < navigationOnlyMenuFlat.length; i++) {
      const current = navigationOnlyMenuFlat[i]
      if (current.fixed) {
        fixedIndexCount += 1
        commit('ADD_VIEW', {
          title: current.title,
          routeName: current.routeName,
          spin: false,
          fixed: current.fixed
        })
      }
    }

    if (fixedIndexCount !== -1) {
      commit('ACTIVE_VIEW', navigationOnlyMenuFlat[fixedIndexCount].routeName)
    }
  },

  add({ commit }, viewRoute) {
    commit('ADD_VIEW', viewRoute)
  },

  del({ commit }, routeName) {
    commit('DELETE_VIEW', routeName)
  },

  active({ commit }, routeName) {
    commit('ACTIVE_VIEW', routeName)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
