class Subscriber {
  constructor(connectionUrl, config = {}) {
    this.url = connectionUrl;
    this.config = config;
    this.reconnectionCount = 0;
    this.config.reconnectionAttempts = this.config.reconnectionAttempts
      || Infinity;
    this.config.reconnectionDelay = this.config.reconnectionDelay || 1000;
    
    this.channels = {};
    this.socket = Subscriber.connect(this.url, this.config);
    this.setUpListeners();
    
    this.pendingSubscriptions = {}
  }
  
  static connect(url, config) {
    let protocol = config.protocol || '';
    return protocol === '' ?
      new WebSocket(url) :
      new WebSocket(url, protocol);
  }
  
  reconnect() {
    if (this.reconnectionCount <= this.config.reconnectionAttempts) {
      this.reconnectionCount++;
      clearTimeout(this.reconnectTimeoutId);
      
      this.reconnectTimeoutId = setTimeout(async () => {
        this.socket = await Subscriber.connect(this.url, this.config);
        this.setUpListeners();
      }, this.config.reconnectionDelay)
    }
  }
  
  setUpListeners() {
    const defaultOnMessage = (message) => {
      //Do nothing
    };
    
    this.onmessage = this.config.onmessage || defaultOnMessage;
    
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'ping') {
        return;
      }
      if (message.type === 'welcome') {
        return;
      }
      
      if (message.type === 'confirm_subscription') {
        if (message.identifier) {
          this.pendingSubscriptions[message.identifier](message);
        }
        return;
      }
      
      if (message.identifier) {
        const {channel} = JSON.parse(message.identifier);
        this.channels[channel].fn(message);
      } else {
        this.onmessage(message);
      }
    };
  }
  
  isOpenSocket() {
    return this.socket.readyState === WebSocket.OPEN;
  }
  
  subscribe(channel, fn, payload, retryId) {
    if (this.isOpenSocket()) {
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: channel,
          ...payload,
        }),
      };
      this.socket.send(JSON.stringify(msg));
      this.channels[channel] = {fn};
      
      new Promise((resolve) => {
        this.pendingSubscriptions[msg.identifier] = resolve
      }).then((data) => {
        delete this.pendingSubscriptions[data.identifier];
      })
    }
    else {
      clearTimeout(retryId);
      let retryId = setTimeout(() => {
        this.subscribe(channel, fn, payload, retryId);
      }, 1000);
    }
  }
  
  perform(channel, action, payload, retryId) {
    if (this.isOpenSocket()) {
      const identifier = JSON.stringify({
        channel: channel,
      });
      if(!this.pendingSubscriptions[identifier]) {
        const msg = {
          command: 'message',
          identifier: JSON.stringify({
            channel: channel,
          }),
          data: JSON.stringify({
            action: action,
            ...payload,
          }),
        };
        this.socket.send(JSON.stringify(msg));
      } else {
        clearTimeout(retryId);
        let retryId = setTimeout(() => {
          this.perform(channel, action, payload, retryId)
        }, 1000);
      }
      
    }
  }
  
  unsubscribe(channelToUnSub, id) {
    const channel = this.channels[channelToUnSub];
    if (channel) {
      this.channels[channelToUnSub] = channel.filter(handler => {
        return handler.id !== id;
      });
    }
  }
}

export default Subscriber
