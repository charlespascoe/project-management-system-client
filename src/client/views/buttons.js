import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.size = this.props.size || 'lg';

    if (this.props.icon) {
      this.icon = (
        <span className={`glyphicon glyphicon-${this.props.icon}`} aria-hidden='true'></span>
      );
    }
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.props.onClick) return;
    this.props.onClick();
  }

  render() {
    return (
      <button
        className={`btn btn-${this.size} btn-${this.type} btn-block`}
        onClick={this.onClick.bind(this)}
        disabled={this.props.disabled}>
          {this.icon || ''}{this.props.text}
      </button>
    );
  }
}

export class PrimaryButton extends Button {
  constructor(props) {
    super(props);
    this.type = 'primary';
  }
}

export class SuccessButton extends Button {
  constructor(props) {
    super(props);
    this.type = 'success';
  }
}

export class DangerButton extends Button {
  constructor(props) {
    super(props);
    this.type = 'danger';
  }
}

export class InfoButton extends Button {
  constructor(props) {
    super(props);
    this.type = 'info';
  }
}
