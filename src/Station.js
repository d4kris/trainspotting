import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  actions,
  toggleStationPicker,
  selectStation,
  trainsLoaded
} from './actions.js';

const mapStateToProps = (state, props) => ({
  selected: (props.action === actions.SELECT_FROM) ? state.fromStation : state.toStations,
  stations: state.stations,
  showPicker: state.showPicker
});

const mapDispatchToProps = (dispatch, props) => ({
  togglePicker: () => dispatch(toggleStationPicker()),
  selectStation: (event) => {
    return dispatch(selectStation(props.action, event.target.value));
  },
  onTrainsLoaded: (payload) => {
    return dispatch(trainsLoaded(payload));
  }
});

class Station extends Component {

  stationName(id) {
    const station = this.props.stations.find(s => s.id === id);
    return station ? station.name : 'Select station';
  }

  stationNames() {
    if (Array.isArray(this.props.selected)) {
      return this.props.selected.map((s) => this.stationName(s)).join(', ');
    } else {
      return this.stationName(this.props.selected);
    }
  }
  
  render() {
    if (!this.props.showPicker) {
      return (
        <span className="station-name" onClick={this.props.togglePicker}>
          {this.stationNames()}
        </span>
      );
    }
    return (
      <select className="stations-list"
              value={this.props.selected}
              onChange={this.props.selectStation}
              multiple="true">
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