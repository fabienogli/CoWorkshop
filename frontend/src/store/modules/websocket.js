const state = {
  isConnected: true,
  message: '',
  reconnectError: false,
};


const getters = {
};

const mutations = {
  SOCKET_ONOPEN (state, event)  {
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE (state, event)  {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event)  {
    console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message)  {
    state.message = message
  },
  // mutations for reconnect methods
  [WebSocket.WS_RECONNECT](state, count) {
    console.info(state, count)
  },
  [WebSocket.WS_RECONNECT_ERROR](state) {
    state.socket.reconnectError = true;
  },
  increment (state) {
    state.count++
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
