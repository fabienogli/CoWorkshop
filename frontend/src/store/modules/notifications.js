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
  },
  setRead(state, notif) {
    const notification = JSON.parse(JSON.stringify(notif));
    notification.read = true;
    state.notifs.splice(notif.id, 1, notification);
  }
};

const actions = {
  addNotif({commit}, notif) {
    commit('addNotif', notif);
  },
  removeNotif({commit}, notif) {
    commit('removeNotif', notif);
  },
  setRead({commit}, notif) {
    commit('setRead', notif);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
