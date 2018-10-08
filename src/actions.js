// import fetch from 'cross-fetch';
import agent from './agent';

export const actions = {
  TOGGLE: 'TOGGLE',
  UPDATE: 'UPDATE',
  SHOW_PICKER: 'SHOW_PICKER',
  TOGGLE_PICKER: 'TOGGLE_PICKER',
  REVERSE_TO_FROM: 'REVERSE_TO_FROM',
  SELECT_FROM: 'SELECT_FROM_STATION',
  SELECT_TO: 'SELECT_TO_STATION',
  TRAIN_LOAD: 'TRAIN_LOAD',
  TRAIN_LOADED: 'TRAIN_LOADED',
  JOKE_LOAD: 'JOKE_LOAD',
  JOKE_LOADED: 'JOKE_LOADED'
};

export function jokeLoaded(payload) {
  return { type: actions.JOKE_LOADED, payload };
}

export function loadJoke() {
  return dispatch => {
    dispatch({ type: actions.JOKE_LOAD });
    return agent.Jokes.dad().then(payload => {
      dispatch(jokeLoaded(payload));
    })
  };
}

export function toggleAutoUpdate() {
  return { type: actions.TOGGLE };
}

export function toggleStationPicker() {
  return { type: actions.TOGGLE_PICKER };
}

export function selectStation(action, stationId) {
  return { type: action, id: stationId };
}

export function reverseToFrom() {
  return { type: actions.REVERSE_TO_FROM };
}

export function trainsLoaded(payload) {
  return { type: actions.TRAIN_LOADED, payload };
}


export function loadTrains(from, to) {
  return dispatch => {
    // set loading
    dispatch({ type: actions.TRAIN_LOAD });

    return agent.Trains.getFromTo(from, to)
      .then(payload => {
          dispatch(trainsLoaded(payload));
        }
      );
  }

}

