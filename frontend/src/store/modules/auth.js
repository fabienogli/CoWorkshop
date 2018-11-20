const state = {
  token: '',
  user_id: 0,
};

const getters = {
  token(state) {
    return state.token;
  },
  user_id(state) {
    return state.user_id
  }
};

const mutations = {
  replaceToken(state, token) {
    state.token = token;
  }
};

const actions = {
  setToken({commit}, token) {
    commit('replaceToken', token);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
