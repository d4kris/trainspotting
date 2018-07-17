import React, {Component} from 'react';
import {connect} from 'react-redux';
import {store} from './store.js';

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
    <select className="stations-list">
      {props.list.map(item => {
        return (
          <option key={item.id} value={item.id}>
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
    store.dispatch({ type: 'TOGGLE_PICKER' });
  }

  render() {
    return (
      <div>
        <span onClick={this.togglePicker}>{this.stationName()}</span>
        <Stations list={this.props.stations}
                  showPicker={this.props.showPicker}
                  togglePicker={this.togglePicker}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(Station);