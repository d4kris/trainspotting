import React, {Component} from 'react';

const Stations = (props) => {
  if (!props.showPicker) {
    return <span onClick={props.togglePicker}>Change</span>
  }
  return (
    <select className="stations-list"
            value={props.selected} onChange={props.selectStation}>
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
  state = {
    showPicker: this.props.showPicker,
    stations: this.props.stations,
    selected: this.props.selected
  };

  stationName() {
    const station = this.state.stations.find(s => s.id === this.state.selected);
    return station ? station.name : 'Select station';
  }

  togglePicker = () => {
    this.setState({ showPicker: !this.state.showPicker });
  }

  selectStation = (e) => {
    this.setState({
      selected: e.target.value,
      showPicker: false
    })
  }
  render() {
    return (
      <span>
        <span onClick={this.togglePicker}>{this.stationName()}</span>
        <Stations list={this.props.stations}
          showPicker={this.state.showPicker}
          togglePicker={this.togglePicker}
          selectStation={this.selectStation}
          selected={this.state.selected}
        />
      </span>
    )
  }
}

export default Station;