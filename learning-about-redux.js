const ticketListReducer = (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
  case 'ADD_TICKET':
    return Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  case 'DELETE_TICKET':
    const newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};

//start with destructuring to get createStore fxn from Redux in CDN
const { createStore } = Redux;

//create the store which holds app's state tree
//state tree is immutable and is replaced with a new immutable struc on each update
//createStore takes a reducer as an argument - reducer tells store how to handle actions
const store = createStore(ticketListReducer);

//checks the state of store with getState() method being called *on* store
//logs initial state
console.log(store.getState());

// in order to actually log changes to state, need to listen for changes with subscribe() method
// re: pubsub pattern - store acts as intermediary btw sub(scribing) and pub(lishing)
// naming it in constant unsubscribe allows for unsubscribing later
const unsubscribe = store.subscribe(() => console.log(store.getState()));

//dispatch() method publishes
//each time an action is dispatched, it will trigger subscription and log the result to store.getState()
store.dispatch({
  type: 'ADD_TICKET',
  names: 'Jasmine and Justine',
  location: '2a',
  issue: 'Reducer has side effects.',
  id: 1
});

store.dispatch({
  type: 'ADD_TICKET',
  names: 'Brann and Rose',location: '3b',
  issue: 'Problems understanding Redux.',
  id: 2
});

store.dispatch({
  type: 'DELETE_TICKET',
  id: 1
});

//ends the subscription
unsubscribe();
//when bindings combine React Redux, will handle subscribe under the hood