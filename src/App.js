import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {defaultState} from './store.js';
import Station from './Station.js';
import Trains from './Trains.js';


class App extends Component {
  state = defaultState;

  render() {
    const onClick = () => {
      console.log('Toggle check');
      this.setState({ checked: !this.state.checked })
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Trainspotting</h1>
        </header>
        <p className="station-update">
          <input
            type="checkbox"
            checked={!!this.state.checked}
            onClick={onClick}
          /> Update automatically
        </p>
        <div className="trains">
          <h2>
            <span>Trains from </span>
            <Station selected={this.state.station} stations={this.state.stations}
                   showPicker={this.state.showPicker} />
          </h2>
          <Trains trains={this.state.trains} />
        </div>
      </div>
    );
  }
}

export default App;
