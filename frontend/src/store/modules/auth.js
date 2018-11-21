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
    state.token = token || '';
  },
  setUserId(state, id) {
    state.user_id = id;
  }
};

const actions = {
  setTokenAndUserId({commit}, payload) {
    commit('replaceToken', payload.token);
    commit('setUserId', payload.user.id);
  },
  logout({commit}) {
    commit('replaceToken', "");
    commit('setUserId', 0);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
