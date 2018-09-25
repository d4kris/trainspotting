import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from './store.js';

const mapStateToProps = (state, props) => ({
  selected: (props.action === actions.SELECT_FROM) ? state.fromStation : state.toStation,
  stations: state.stations,
  showPicker: state.showPicker
});

const mapDispatchToProps = (dispatch, props) => ({
  togglePicker: () => dispatch({ type: actions.TOGGLE_PICKER }),
  selectStation: (event) => {
    return dispatch({ type: props.action, id: event.target.value });
  },
  onTrainsLoaded: (payload) => {
    return dispatch({ type: actions.TRAIN_LOAD, payload });
  }

});

class Station extends Component {

  stationName() {
    const station = this.props.stations.find(s => s.id === this.props.selected);
    return station ? station.name : 'Select station';
  }
  
  render() {
    if (!this.props.showPicker) {
      return (
        <span className="station-name" onClick={this.props.togglePicker}>
          {this.stationName()}
        </span>
      );
    }
    return (
      <select className="stations-list"
              value={this.props.selected}
              onChange={this.props.selectStation}>
        {this.props.stations.map(station => {
          return (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Station);