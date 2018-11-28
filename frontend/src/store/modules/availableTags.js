const state = {
  availableTags: [],
};

const getters = {
  all(state) {
    return state.availableTags;
  }
};

const mutations = {
  set(state, availableTags) {
    state.availableTags = availableTags;
  },

  add(state, availableTag) {
    state.availableTags.push(availableTag);
  },

  remove(state, availableTag) {
    let index = state.availableTags.indexOf(availableTag);
    if (index === -1) {
      return;
    }
    state.availableTags.splice(index, 1);
  }
};

const actions = {
  set({commit}, availableTags) {
    commit('set', availableTags);
  },
  add({commit}, availableTag) {
    commit('add', availableTag);
  },
  remove({commit}, availableTag) {
    commit('remove', availableTag);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
