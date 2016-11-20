import React, { Component } from 'react';

export default class InputLabel extends Component {
  render() {
    return (
      <label htmlFor={this.props.forId}>{this.props.label}{this.props.hint ? <span className={`hint ${this.props.invalid ? 'invalid' : ''}`}>{this.props.hint}</span> : ''}</label>
    );
  }
}
