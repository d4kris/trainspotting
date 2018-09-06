import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from "./middleware";

const defaultState = {
  station: 'kba',
  checked: false,
  showPicker: false,
  stations: [{
    id: 'gbg',
    name: 'Göteborg'
  },{
    id: 'Kb',
    name: 'Kungsbacka'
  },{
    id: 'hde',
    name: 'Hede'
  }]
};

export const actions = {
  TOGGLE: 'TOGGLE',
  UPDATE: 'UPDATE',
  SHOW_PICKER: 'SHOW_PICKER',
  TOGGLE_PICKER: 'TOGGLE_PICKER',
  SELECT_STATION: 'SELECT_STATION',
  TRAIN_LOAD: 'TRAIN_LOAD',
  JOKE_LOAD: 'JOKE_LOAD'
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.JOKE_LOAD: return {...state, joke: action.payload };
    case actions.TRAIN_LOAD: return {...state, trains: action.payload };
    case actions.TOGGLE: return {...state, checked: !state.checked };
    case actions.UPDATE: return {...state, update: true };
    case actions.SHOW_PICKER: return {...state, showPicker: true };
    case actions.TOGGLE_PICKER: return {...state, showPicker: !state.showPicker };
    case actions.SELECT_STATION: return {...state, station: action.id, showPicker: false };
    default: return state;
  }
};


export const store = createStore(reducer, applyMiddleware(promiseMiddleware));
