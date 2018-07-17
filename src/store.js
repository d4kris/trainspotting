import {createStore} from 'redux';

const defaultState = {
  station: 'kba',
  checked: false,
  showPicker: false,
  stations: [{
    id: 'gbg',
    name: 'Göteborg'
  },{
    id: 'kba',
    name: 'Kungsbacka'
  },{
    id: 'hde',
    name: 'Hede'
  }],
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

export const actions = {
  TOGGLE: 'TOGGLE',
  UPDATE: 'UPDATE',
  SHOW_PICKER: 'SHOW_PICKER',
  TOGGLE_PICKER: 'TOGGLE_PICKER',
  SELECT_STATION: 'SELECT_STATION'
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.TOGGLE: return {...state, checked: !state.checked };
    case actions.UPDATE: return {...state, update: true };
    case actions.SHOW_PICKER: return {...state, showPicker: true };
    case actions.TOGGLE_PICKER: return {...state, showPicker: !state.showPicker };
    case actions.SELECT_STATION: return {...state, station: action.id, showPicker: false };
    default: return state;
  }
};


export const store = createStore(reducer);
