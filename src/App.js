import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './store.js';
import {connect} from 'react-redux';
import Station from './Station.js';
import Trains from './Trains.js';

const mapStateToProps = state => ({
  station: state.station,
  checked: state.checked,
  trains: state.trains
});

class App extends Component {

  render() {
    const onClick = () => {
      console.log('Toggle check');
      store.dispatch({ type: 'TOGGLE' })
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
            checked={!!this.props.checked}
            onClick={onClick}
          /> Update automatically
        </p>
        <div className="trains">
          <h2>
            <span>Trains from </span>
            <Station name={this.props.station} />
          </h2>
          <Trains trains={this.props.trains} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}) )(App);
