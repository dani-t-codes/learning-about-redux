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

const { createStore } = Redux;

const store = createStore(ticketListReducer);

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

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

unsubscribe();