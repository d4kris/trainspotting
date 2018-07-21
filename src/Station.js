import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store, actions} from './store.js';

const mapStateToProps = state => ({
  selected: state.station,
  stations: state.stations,
  showPicker: state.showPicker
});

const Stations = (props) => {
  if (!props.showPicker) {
    return <span onClick={props.togglePicker}>Change</span>
  }
  return (
    <select className="stations-list" onChange={props.selectStation}>
      {props.list.map(item => {
        return (
          <option key={item.id} value={item.id}
          selected={item.id === props.selected}>
            {item.name}
            </option>
        );
      })}
    </select>
  );
};

class Station extends Component {

  stationName() {
    const station = this.props.stations.find(s => s.id === this.props.selected);
    return station ? station.name : 'Select station';
  }

  togglePicker() {
    store.dispatch({ type: actions.TOGGLE_PICKER });
  }

  selectStation(event) {
    store.dispatch({ type: actions.SELECT_STATION, id: event.target.value });
  }

  render() {
    if (!this.props.showPicker) {
      return <span onClick={this.togglePicker}>{this.stationName()}</span>
    }
    return (
      <select className="stations-list"
              value={this.props.selected}
              onChange={this.selectStation}>
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

export default connect(mapStateToProps, () => ({}))(Station);