import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import { actions } from './actions';

export const stations = [{
  id: 'G',
  name: 'Göteborg'
},{
  id: 'Kb',
  name: 'Kungsbacka'
},{
  id: 'Hde',
  name: 'Hede'
},{
  id: 'Mdn',
  name: 'Mölndal'
},{
  id: 'Ag',
  name: 'Anneberg'
}];

const defaultState = {
  fromStation: 'G',
  toStation: 'Kb',
  checked: false,
  showPicker: false,
  stations: stations,
  isLoading: true,
  msgs: [],
  stationChanged: false
};


const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case actions.JOKE_LOAD: return {...state, joke: 'Wait for it...' };
    case actions.JOKE_LOADED: return {...state, joke: action.payload };
    case actions.TRAIN_LOAD: return {...state, trains: [], isLoading: true, stationChanged: false };
    case actions.TRAIN_LOADED: return {...state, trains: action.payload, isLoading: false };
    case actions.TOGGLE: return {...state, checked: !state.checked };
    case actions.UPDATE: return {...state, update: true };
    case actions.SHOW_PICKER: return {...state, showPicker: true };
    case actions.TOGGLE_PICKER: return {...state, showPicker: !state.showPicker };
    case actions.REVERSE_TO_FROM: return {...state,
      fromStation: state.toStation,
      toStation: state.fromStation,
      stationChanged: true
    };
    case actions.SELECT_FROM: return {...state,
      fromStation: action.id,
      showPicker: false, 
      stationChanged: true
    };
    case actions.SELECT_TO: return {...state,
      toStation: action.id,
      showPicker: false,
      stationChanged: true
    };
    case actions.MSG_LOAD: return {...state, msgs: [] };
    case actions.MSG_LOADED: return {...state, msgs: action.payload };
    default: return state;
  }
};

const loggerMiddleware = createLogger()

export const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
