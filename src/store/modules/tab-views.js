const state = () => ({
  cacheViews: [],
  cacheViewsKeys: [],
  activeViewKey: ''
})

const getters = {
  currentActiveViewKey(state) {
    return state.activeViewKey
  },

  getLastCacheViewKey(state) {
    return state.cacheViewsKeys[state.cacheViewsKeys.length - 1]
  }
}

const mutations = {
  ADD_VIEW: (state, viewRoute) => {
    if (state.cacheViewsKeys.indexOf(viewRoute.routeName) === -1) {
      state.cacheViews.push(viewRoute)
      state.cacheViewsKeys.push(viewRoute.routeName)
      state.activeViewKey = viewRoute.routeName
    }
  },

  DELETE_VIEW: (state, deleteIndex) => {
    state.cacheViews = state.cacheViews.filter((val, index) => index !== deleteIndex)
    state.cacheViewsKeys = state.cacheViewsKeys.filter((val, index) => index !== deleteIndex)
  },

  ACTIVE_VIEW: (state, routeName) => {
    if (routeName) {
      state.activeViewKey = routeName
    } else if (state.cacheViewsKeys.length > 0) {
      state.activeViewKey = [...state.cacheViewsKeys][state.cacheViewsKeys.length - 1]
    }
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
  },

  closeCurrentTabView({ commit, state }, routeName) {
    const findViewKeyIndex = state.cacheViewsKeys.indexOf(routeName)
    if (findViewKeyIndex !== -1) {
      commit('DELETE_VIEW', findViewKeyIndex)
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
