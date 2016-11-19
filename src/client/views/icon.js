import React, { Component } from 'react';

export default class Icon extends Component {
  render() {
    return <span className={`glyphicon glyphicon-${this.props.type}`} aria-hidden='true'></span>
  }
}
