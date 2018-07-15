import React, {Component} from 'react';

class Station extends Component {
  render() {
    return (
      <span>{this.props.name}</span>
    )
  }
}

export default Station;