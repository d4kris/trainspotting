import React, {Component} from 'react';

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
  };

  selectStation = (e) => {
    this.setState({
      selected: e.target.value,
      showPicker: false
    })
  };

  render() {
    if (!this.state.showPicker) {
      return <span onClick={this.togglePicker}>{this.stationName()}</span>
    }
    return (
      <select className="stations-list"
              value={this.state.selected}
              onChange={this.selectStation}>
        {this.props.stations.map(item => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default Station;