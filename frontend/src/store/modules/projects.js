import store from '../index';
const state = {
  works: [],
};

const getters = {
  all(state) {
    return state.works;
  }
};

const mutations = {
  setWorks(state, works) {
    state.works = works;
  },
  addWork(state, work) {
    const found = state.works.some((worko) => worko.id === work.id);
    if(!found) {
      state.works.push(work);
    }
  },
  removeWork(state, work) {
    state.works = state.works.filter(worko => {
      return worko.id !== work.id;
    })
  },
  updateWork(state, work) {
    const index = state.works.findIndex((worki) => worki.id === work.id);
    state.works.splice(index, 1, work);
  }
};

const actions = {
  setWorks({commit}, works) {
    commit('setWorks', works);
  },
  addWork({commit}, work) {
    work.user = store.getters['auth/user'];
    commit('addWork', work);
  },
  removeWork({commit}, work) {
    commit('removeWork', work)
  },
  updateWork({commit}, work) {
    commit('updateWork', work);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
