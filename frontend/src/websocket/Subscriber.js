class Subscriber {
  constructor(connectionUrl, config = {}) {
    this.url = connectionUrl;
    this.config = config;
    this.reconnectionCount = 0;
    this.config.reconnectionAttempts = this.config.reconnectionAttempts
      || Infinity;
    this.config.reconnectionDelay = this.config.reconnectionDelay || 1000;
    
    this.channels = {};
  }
  
  async connectAndSetUpListeners() {
    this.socket =  await Subscriber.connect(this.url, this.config);
    this.setUpListeners();
  }
  
  static async connect(url, config) {
    
    return new Promise((resolve, reject) => {
      let protocol = config.protocol || '';
      let socket = protocol === '' ?
        new WebSocket(url) :
        new WebSocket(url, protocol);
      
      socket.onopen = () => {
        resolve(socket);
      };
      
      socket.onerror = (err) => {
        reject(err);
      };
    });
  }
  
  async reconnect() {
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
      if(message.identifier) {
        const channel = JSON.parse(message.identifier).channel;
        Object.keys(this.channels)
          .filter(chan => chan.id === channel.id)
          .forEach(chan => {
            console.log(chan);
            chan.map(handler => handler.callback)
                .forEach(fn => fn());
          });
      }
    };
  }
  
  subscribe(channel, id,  fn) {
    if(this.socket.readyState === WebSocket.OPEN) {
      console.log('isOpen');
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: channel,
        }),
      };
      this.socket.send(JSON.stringify(msg));
      if(this.channels[channel] && this.channels[channel].constructor === Array) {
        const handler = {
          id: 1,
          callback: fn,
        };
        this.channels[channel].push(handler);
      }
    } else {
      const retryId = setTimeout(() => {
        this.subscribe(channel, id, fn);
      }, 400);
      clearTimeout(retryId);
    }
    
  }
  
  unsubscribe(channelToUnSub, id) {
    const channel = this.channels[channelToUnSub];
    if(channel) {
      this.channels[channelToUnSub] = channel.filter(handler => {
        return handler.id !== id;
      });
    }
  }
}

export default Subscriber
