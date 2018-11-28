const state = {
  shouldSetup: true,
};

const getters = {
  shouldSetup(state) {
    return state.shouldSetup
  }
};

const mutations = {
 setSetup(state, setup) {
    state.shouldSetup = setup
  },
};

const actions = {
  setSetup({commit}, setup) {
    commit('setSetup', setup);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
