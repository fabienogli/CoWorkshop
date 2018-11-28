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
    state.tags.push(tag);
  },
  removeTag(state, tag) {
    state.notifs = state.notifs.filter(notification => {
      return notification.id !== notif.id;
    })
  },
  updateTag(state, tag) {
    const index = state.tags.findIndex((tagi) => tagi.id === tag.id);
    state.notifs.splice(index, 1, tag);
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
    commit('tag', tag);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
