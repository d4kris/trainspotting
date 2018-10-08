import React, { Component } from 'react';
import { headerImgs } from './utils';
import './App.css';
import { actions, loadJoke, toggleAutoUpdate, reverseToFrom, loadTrains } from './actions.js';
import { connect } from 'react-redux';
import Station from './Station';
import Trains from './Trains';

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

  getHeaderImg() {
    const ix = +new Date() % 5;
    return headerImgs[ix];
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={this.getHeaderImg()} className="header-img" alt="trains" />
          <h1 className="header-title">Trainspotting</h1>
          <p className="joke">{this.props.joke}</p>
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
