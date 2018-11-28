const state = {
  subscriptions: [],
};

const getters = {
  all(state) {
    return state.subscriptions;
  }
};

const mutations = {
  set(state, subscriptions) {
    state.subscriptions = subscriptions;
  },

  add(state, subscription) {
    state.subscriptions.push(subscription);
  },

  remove(state, subscription) {
    let index = state.subscriptions.indexOf(subscription);
    if (index === -1) {
      return;
    }
    state.subscriptions.splice(index, 1);
  }
};

const actions = {
  set({commit}, subscriptions) {
    commit('set', subscriptions);
  },
  add({commit}, subscription) {
    commit('add', subscription);
  },
  remove({commit}, subscription) {
    commit('remove', subscription);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
