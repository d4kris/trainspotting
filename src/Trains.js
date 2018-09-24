import React, {Component} from 'react';
import { connect } from 'react-redux';
import { format } from './utils.js';

const mapStateToProps = state => ({
  trains: state.trains
});

class Trains extends Component {
  render() {
    if (!this.props.trains) {
      return (
        <p>Loading...</p>
      )
    }
    if (this.props.trains.length === 0) {
      return (
        <p>No trains found</p>
      )
    }
    return (
        <table className="trains-list">
          <tbody>
          {this.props.trains.map(train => {
            return (
              <tr key={train.id}>
                <td className="trains-name">
                  <div>{train.name}</div>
                  <div>{train.to}</div>
                </td>
                  <TrainTime train={train}/>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
}

/**
 * Helper to show time and when applicable estimated or real time
 * @param props
 * @constructor
 */
const TrainTime = (props) => {
  if (props.train.estTime) {
    return (
      <td className="trains-time">
        <div className="oldTime">{format.dateToTimeString(props.train.time)}</div>
        <div className="estTime">{format.dateToTimeString(props.train.estTime)}</div>
      </td>
    )
  }
  if (props.train.realTime) {
    return (
      <td className="trains-time">
        <div className="oldTime">{format.dateToTimeString(props.train.time)}</div>
        <div className="realTime">{format.dateToTimeString(props.train.realTime)}</div>
      </td>
    )
  }
  return (
    <td className="trains-time">
      <div>{format.dateToTimeString(props.train.time)}</div>
      <div className="realTime"></div>
    </td>
  )
}

export default connect(mapStateToProps, () => ({}))(Trains);