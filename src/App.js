import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { actions, loadJoke, toggleAutoUpdate, reverseToFrom, loadTrains } from './actions.js';
import { connect } from 'react-redux';
import Station from './Station.js';
import Trains from './Trains';
import agent from './agent';

const mapStateToProps = state => ({
  checked: state.checked,
  joke: state.joke,
  fromStation: state.fromStation,
  toStation: state.toStation,
  stations: state.stations
});

const mapDispatchToProps = {
  onLoad: () => loadJoke(),
  onTrainsLoad: (from, to) => loadTrains(from, to),
  toggle: () => toggleAutoUpdate(),
  reverseTrip: () => reverseToFrom()
};

class App extends Component {

  componentDidMount() {
    console.log('Did mount app, load joke');
    this.props.onLoad();
  }

  componentDidUpdate() {
    console.log('Update, load new trains');
    this.props.onTrainsLoad(this.props.fromStation, this.props.toStation);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Trainspotting</h1>
          <p>{this.props.joke}</p>
        </header>
        <p className="station-update">
          <input
            type="checkbox"
            checked={!!this.props.checked}
            onClick={this.props.toggle}
          /> Update automatically
        </p>
        <div className="trains">
          <h2>
            <span>Trains from </span>
            <Station action={actions.SELECT_FROM} />
            <span className="station-to" onClick={this.props.reverseTrip}> to </span>
            <Station action={actions.SELECT_TO} />
          </h2>
          <Trains />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
