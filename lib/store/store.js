import EventPublisher from "./eventPublisher";

export  default class Store {
  constructor(params) {
    let self = this;

    self.status = 'idle'

    self.mutations = {};
    self.actions = {};
    self.state = {};

    self.events = new EventPublisher();

    if (params.hasOwnProperty("actions")) {
        self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
        self.mutations = params.mutations;
    }

    self.state = new Proxy((params.state || {}), {
      set: function(state, key, value) {
        state[key] = value;

        self.events.publish("change", self.state);

        if (self.status === 'mutation') {
          console.warn('use mutations instead')
        }

        self.status = 'idle'

        return true;
      }
    })
  }

  dispatch(action, payload) {
    let self = this;

    if(typeof self.actions[action] !== 'function') {
      console.error(`Action "${action} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${action}`);

    self.status = 'action';

    self.actions[action](self, payload);

    console.groupEnd();
    return true;
  }

  commit(mutation, payload) {
    let self = this;

    if(typeof self.mutations[mutation] !== 'function') {
      console.error(`Mutation "${mutation}" doesn't exist`);
      return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[mutation](self.state, payload);
    self.state = Object.assign(self.state, newState);
    return true;
  }
}
