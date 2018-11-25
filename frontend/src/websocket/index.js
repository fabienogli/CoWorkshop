import Subscriber from './Subscriber';
import Emitter from './Emitter';

export default {
  install(Vue, connection, config = {}) {
    if (!connection) {
      throw new Error('[irindul-websocket] - cannot locate connection');
    }
    
    let subscriber = new Subscriber(connection, config);
    let emitter = new Emitter(subscriber.socket);
    Vue.prototype.$socket = subscriber.socket;
    Vue.prototype.$subscriber = subscriber;
    Vue.prototype.$emitter = emitter;
  }
}
