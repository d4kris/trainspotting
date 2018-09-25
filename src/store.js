import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from "./middleware";

export const stations = [{
  id: 'G',
  name: 'Göteborg'
},{
  id: 'Kb',
  name: 'Kungsbacka'
},{
  id: 'hde',
  name: 'Hede'
},{
  id: 'Mdn',
  name: 'Mölndal'
}];

const defaultState = {
  fromStation: 'Kb',
  toStation: 'G',
  checked: false,
  showPicker: false,
  stations: stations
};

export const actions = {
  TOGGLE: 'TOGGLE',
  UPDATE: 'UPDATE',
  SHOW_PICKER: 'SHOW_PICKER',
  TOGGLE_PICKER: 'TOGGLE_PICKER',
  SELECT_FROM: 'SELECT_FROM_STATION',
  SELECT_TO: 'SELECT_TO_STATION',
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
    case actions.SELECT_FROM: return {...state, fromStation: action.id, showPicker: false };
    case actions.SELECT_TO: return {...state, toStation: action.id, showPicker: false };
    default: return state;
  }
};


export const store = createStore(reducer, applyMiddleware(promiseMiddleware));
