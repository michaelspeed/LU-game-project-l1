import EventPublisher from "./eventPublisher.js";

export  default class Store {
  constructor(params) {
    const control = this;
    control.status = 'idle'
    control.mutations = {};
    control.actions = {};
    control.state = {};

    control.events = new EventPublisher();

    if (params.hasOwnProperty("actions")) {
        control.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
        control.mutations = params.mutations;
    }

    control.state = new Proxy((params.state || {}), {
      set: function(state, key, value) {
        state[key] = value;
        control.events.publish("change", control.state);
        control.status = 'idle'
        return true;
      }
    })
  }

  dispatch(action, payload) {
    let control = this;
    if(typeof control.actions[action] !== 'function') {
      console.error(`Action "${action} doesn't exist.`);
      return false;
    }
    control.status = 'action';
    control.actions[action](control, payload);
    return true;
  }

  setter(mutation, payload) {
    let control = this;
    if(typeof control.mutations[mutation] !== 'function') {
      console.error(`Mutation "${mutation}" doesn't exist`);
      return false;
    }
    control.status = 'mutation';
    let newState = control.mutations[mutation](control.state, payload);
    control.state = Object.assign(control.state, newState);
    return true;
  }
}
