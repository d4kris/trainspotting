import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './store.js';
import {connect} from 'react-redux';
import Station from './Station.js';

const mapStateToProps = state => ({
  station: state.station,
  checked: state.checked
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
        <Station name={this.props.station} />
        <p className="App-intro">
          <input
            type="checkbox"
            checked={!!this.props.checked}
            onClick={onClick}
          /> Update automatically
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}) )(App);
