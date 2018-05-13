const app = {
  getters: {
    sidebar: state => state.sidebar
  },
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        state.sidebar.opened = false
      } else {
        state.sidebar.opened = true
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
