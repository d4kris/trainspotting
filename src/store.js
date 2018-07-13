import {createStore} from 'redux';

const defaultState = {
  station: 'Kungsbacka',
  checked: false,
  trains: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE': return {...state, checked: !state.checked };
    case 'UPDATE': return {...state, update: true };
    default: return state;
  }
};


export const store = createStore(reducer);
