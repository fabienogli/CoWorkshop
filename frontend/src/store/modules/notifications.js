import http from '@/http';

const state = {
  notifs: [],
  shouldRefresh : true,
};

const getters = {
  notifs(state) {
    return state.notifs;
  },
  shouldRefresh(state) {
    return state.notifs;
  }
};

const mutations = {
  addNotif(state, notif) {
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
    const index = state.notifs.findIndex((noti) => noti.id === notif.id);
    state.notifs.splice(index, 1, notification);
  },
  setUnread(state, notif) {
    const notification = JSON.parse(JSON.stringify(notif));
    notification.read = false;
    const index = state.notifs.findIndex((noti) => noti.id === notif.id);
    state.notifs.splice(index, 1, notification);
  },
  setNotifs(state, notifs) {
    state.notifs = notifs;
  },
  setRefresh(state, refresh) {
    state.shouldRefresh = refresh;
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
    http.put(`/notifications/${notif.id}`, {
      read: true,
    }).then(() => {
      commit('setRead', notif);
    });
  },
  setUnread({commit}, notif) {
    http.put(`/notifications/${notif.id}`, {
      read: false,
    }).then(() => {
      commit('setUnread', notif)
    })
  },
  setNotifs({commit}, notifs) {
    commit('setNotifs', notifs);
  },
  setRefresh({commit}, refresh) {
    commit('setRefresh', refresh);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
