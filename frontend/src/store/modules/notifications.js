const state = {
  notifs: [],
};

const getters = {
  notifs(state) {
    return state.notifs;
  },
};

const mutations = {
  addNotif(state, notif) {
    notif.id = state.notifs.length;
    state.notifs.push(notif);
  },
  removeNotif(state, notif) {
    state.notifs = state.notifs.filter(notification => {
      return notification.id !== notif.id;
    })
  }
};

const actions = {
  addNotif({commit}, notif) {
    commit('addNotif', notif);
  },
  removeNotif({commit}, notif) {
    commit('removeNotif', notif);
  }
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
