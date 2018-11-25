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
      
      if(message.type === 'confirm_subscription') {
        return;
      }
      
      if (message.identifier) {
        const channel = JSON.parse(message.identifier).channel;
        console.log(this.channels);
        Object.keys(this.channels)
          .filter((chan) => chan.id === channel.id)
          .forEach(chan => {
            this.channels[chan].map(handler => handler.callback)
              .forEach(fn => fn(message));
          });
      } else {
        this.onmessage(message);
      }
    };
  }
  
  channelDoesNotExist(channel) {
    return !(
      this.channels[channel]
      && this.channels[channel].constructor === Array
    )
  }
  
  subscribe(channel, id, fn, retryId) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: channel,
        }),
      };
      this.socket.send(JSON.stringify(msg));
      
      if (this.channelDoesNotExist(channel)) {
        this.channels[channel] = [];
      }
      const handler = {
        id: 1,
        callback: fn,
      };
      this.channels[channel].push(handler);
    }
    else {
      clearTimeout(retryId);
      let retryId = setTimeout(() => {
        this.subscribe(channel, id, fn, retryId);
      }, 1000);
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
