import Subscriber from './Subscriber';

export default {
  install(Vue, connection, config = {}) {
    if(!connection) {
      throw new Error('[irindul-websocket] - cannot locate connection');
    }
    
    console.log(connection);
    let subscriber = new Subscriber(connection, config);
    Vue.prototype.$socket = subscriber.socket;
    Vue.prototype.$subscriber = subscriber;
  }
}
