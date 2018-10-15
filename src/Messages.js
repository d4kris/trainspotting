import React, {Component} from 'react';
import { connect } from 'react-redux';
import { format } from './utils.js';

const mapStateToProps = state => ({
  msgs: state.msgs
});

class Messages extends Component {

  render() {
    return (
      <div className="messages">
      {this.props.msgs.map(m => {
        return (
          <div className="msg">
            <div>{m.desc}</div>
            <div>{m.header}</div>
            <div>{m.text}</div>
            <div>{m.startTime}</div>
            <div>{m.endTime}</div>
            <div>{m.lastUpdated}</div>
            <div>{m.modified}</div>
            <div>{m.affectedStations}</div>
            <div>{m.trafficImpact}</div>
          </div>
        )
      })}
      </div>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(Messages);