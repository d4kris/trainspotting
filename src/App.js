import React, { Component } from 'react';
import { headerImgs } from './utils';
import './App.css';
import { actions, loadJoke, toggleAutoUpdate, reverseToFrom, loadTrains, loadMessages } from './actions.js';
import { connect } from 'react-redux';
import Station from './Station';
import Trains from './Trains';
import Messages from './Messages';

const mapStateToProps = state => ({
  checked: state.checked,
  joke: state.joke,
  fromStation: state.fromStation,
  toStations: state.toStations,
  stations: state.stations,
  msgs: state.msgs,
  stationChanged: state.stationChanged
});

const mapDispatchToProps = {
  onLoad: () => loadJoke(),
  onTrainsLoad: (from, toList) => loadTrains(from, toList),
  toggle: () => toggleAutoUpdate(),
  reverseTrip: () => reverseToFrom()
};

class App extends Component {

  componentDidMount() {
    console.log('Did mount app, load joke and trains GBG-Kba');
    this.props.onLoad();
    this.props.onTrainsLoad('G', ['Kb']);
  }

  componentDidUpdate() {
    if (this.props.stationChanged) {
      console.log('Station update, load new trains ' + this.props.fromStation + ' - ' + this.props.toStations);
      this.props.onTrainsLoad(this.props.fromStation, this.props.toStations);
    }
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
        <div className="msgs">
          <Messages />
        </div>
        <div className="trains">
          <h2 className="trains-header">
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
