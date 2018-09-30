import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from './middleware';
import { actions } from './actions';

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


const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case actions.JOKE_LOAD: return {...state, joke: action.payload };
    case actions.TRAIN_LOAD: return {...state, trains: [], loading: true };
    case actions.TRAIN_LOADED: return {...state, trains: action.payload, loading: false };
    case actions.TOGGLE: return {...state, checked: !state.checked };
    case actions.UPDATE: return {...state, update: true };
    case actions.SHOW_PICKER: return {...state, showPicker: true };
    case actions.TOGGLE_PICKER: return {...state, showPicker: !state.showPicker };
    case actions.REVERSE_TO_FROM: return {...state,
      fromStation: state.toStation,
      toStation: state.fromStation,
      trains: null
    };
    case actions.SELECT_FROM: return {...state,
      fromStation: action.id,
      showPicker: false,
      trains: null
    };
    case actions.SELECT_TO: return {...state,
      toStation: action.id,
      showPicker: false,
      trains: null
    };
    default: return state;
  }
};


export const store = createStore(reducers, applyMiddleware(promiseMiddleware));
