class Subscriber {
  constructor(connectionUrl, config = {}) {
    this.url = connectionUrl;
    this.config = config;
    this.reconnectionCount = 0;
    this.config.reconnectionAttempts = this.config.reconnectionAttempts
      || Infinity;
    this.config.reconnectionDelay = this.config.reconnectionDelay || 1000;
    
    this.channels = {};
    
    this.connected = false;
    
    this.socket = Subscriber.connect(connectionUrl, config);
    this.setUpListeners();
  }
  
  static connect(url, config) {
    let protocol = config.protocol || '';
    return protocol === '' ? new WebSocket(url) : new WebSocket(url, protocol);
  }
  
  reconnect() {
    if (this.reconnectionCount <= this.config.reconnectionAttempts) {
      this.reconnectionCount++;
      clearTimeout(this.reconnectTimeoutId);
      
      this.reconnectTimeoutId = setTimeout(() => {
        this.socket = Subscriber.connect();
        this.setUpListeners();
      }, this.config.reconnectionDelay)
    }
  }
  
  setUpListeners() {
    const defaultOnOpen = () => {
      this.connected = true;
    };
    
    const defaultOnMessage = (message) => {
      console.log(message);
    };
    this.onmessage = this.config.onmessage || defaultOnMessage;
    this.socket.onopen = this.config.onopen || defaultOnOpen;
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "ping") {
        return;
      }
      if (message.type === "confirm_subscription") {
        console.log('Confirmed !');
        this.onmessage(message);
      } else {
        this.onmessage(message);
      }
    };
  }
  
  subscribe(channel, fn) {
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: channel,
      }),
    };
    console.log('sending', JSON.stringify(msg));
    this.socket.send(JSON.stringify(msg));
    this.channels[channel] = fn;
  }
}

export default Subscriber
