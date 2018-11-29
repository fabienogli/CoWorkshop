class Emitter {
  constructor(socket) {
    this.socket = socket;
  }
  
  send(channel, data) {
    const message = {
      command: 'message',
      identifier: JSON.stringify({
        channel: channel,
      }),
      data: JSON.stringify(data),
    };
    this.socket.send(JSON.stringify(message));
  }
}

export default Emitter;
