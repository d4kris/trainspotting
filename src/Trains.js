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
                <td className="trains-name">{train.name}</td>
                <td className="trains-time">{format.dateToTimeString(train.time)}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(Trains);