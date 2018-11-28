const state = {
  tags: [],
};

const getters = {
  all(state) {
    return state.tags;
  }
};

const mutations = {
  setTags(state, tags) {
    state.tags = tags;
  },
  addTag(state, tag) {
    const found = state.tags.some((tago) => tago.id === tag.id);
    if(!found) {
      state.tags.push(tag);
    }
  },
  removeTag(state, tag) {
    state.tags = state.tags.filter(tago => {
      return tago.id !== tag.id;
    })
  },
  updateTag(state, tag) {
    const index = state.tags.findIndex((tagi) => tagi.id === tag.id);
    state.tags.splice(index, 1, tag);
  }
};

const actions = {
  setTags({commit}, tags) {
    commit('setTags', tags);
  },
  addTag({commit}, tag) {
    commit('addTag', tag);
  },
  removeTag({commit}, tag) {
    commit('removeTag', tag)
  },
  updateTag({commit}, tag) {
    commit('updateTag', tag);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
