const app = {
  getters: {
    sidebar: state => state.sidebar
  },
  state: {
    sidebar: {
      opened: false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        state.sidebar.opened = false
      } else {
        state.sidebar.opened = true
      }
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
