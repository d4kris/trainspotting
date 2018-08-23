import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { store, actions } from './store.js';
import { connect } from 'react-redux';
import Station from './Station.js';
import Trains from './Trains';
import agent from './agent';

const mapStateToProps = state => ({
  checked: state.checked,
  joke: state.joke
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: actions.APP_LOAD, payload })
});

class App extends Component {

  componentDidMount() {
    console.log('Did mount app');
    this.props.onLoad(agent.Jokes.geek())
  }

  render() {
    const onClick = () => {
      console.log('Toggle check');
      store.dispatch({ type: actions.TOGGLE })
    };

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
            onClick={onClick}
          /> Update automatically
        </p>
        <div className="trains">
          <h2>
            <span>Trains from </span>
            <Station />
          </h2>
          <Trains />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
