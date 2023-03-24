export default class EventPublisher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(event, callbacks) {
    let self = this;
    if(!self.subscribers.hasOwnProperty(event)) {
      self.subscribers[event] = [];
    }
    return self.subscribers[event].push(callback);
  }

  publish(event, data = {}) {
    let self = this;
    if(!self.subscribers.hasOwnProperty(event)) {
      return [];
    }
    return self.subscribers[event].map(callback => callback(data));
  }
}
