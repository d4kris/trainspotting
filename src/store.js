import {createStore} from 'redux';

const defaultState = {
  station: 'Kungsbacka',
  checked: false,
  trains: [{
    id: '1',
    name: 'Öresundståg',
    time: '08:15'
  },{
    id: '2',
    name: 'Västtrafik',
    time: '08:19'
  },{
    id: '3',
    name: 'Västtrafik',
    time: '08:36'
  },{
    id: '4',
    name: 'Öresundståg',
    time: '08:45'
  },{
    id: '5',
    name: 'Västtrafik',
    time: '08:49'
  }]
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE': return {...state, checked: !state.checked };
    case 'UPDATE': return {...state, update: true };
    default: return state;
  }
};


export const store = createStore(reducer);
