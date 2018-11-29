const state = {
  token: '',
  user_id: 0,
  user: {},
};

const getters = {
  token(state) {
    return state.token;
  },
  user_id(state) {
    return state.user_id
  },
  user(state) {
    return state.user
  }
};

const mutations = {
  replaceToken(state, token) {
    state.token = token || '';
  },
  setUserId(state, id) {
    state.user_id = id;
  },
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  setTokenAndUserId({commit}, {token, user}) {
    commit('replaceToken', token);
    commit('setUserId', user.id);
    commit('setUser', user);
  },
  logout({commit}) {
    commit('replaceToken', "");
    commit('setUserId', 0);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
