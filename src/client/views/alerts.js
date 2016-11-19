import React, { Component } from 'react';
import Icon from 'client/views/icon';

class Alert extends Component {
  render() {
    return (
      <div className={`alert alert-${this.type} ${this.props.className || ''}`} role='alert'>
        <div className='icon-container'>
          <Icon type={this.icon} />
        </div>
        <span className='sr-only'>{this.type}:</span>
        <div className='message'>{this.props.message}</div>
      </div>
    );
  }
}

export class SuccessAlert extends Alert {
  constructor(props) {
    super(props);
    this.type = 'success';
    this.icon = 'ok-sign';
  }
}

export class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.type = 'info';
    this.icon = 'info-sign';
  }
}

export class LoadingAlert extends Alert {
  constructor(props) {
    super(props);
    this.type = 'info';
    this.icon = 'cog rotating';
  }
}

export class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.type = 'warning';
    this.icon = 'exclamation-sign';
  }
}

export class DangerAlert extends Alert {
  constructor(props) {
    super(props);
    this.type = 'danger';
    this.icon = 'exclamation-sign';
  }
}

export class AlertContainer extends Component {
  render() {
    return (
      <div className={`alert-container ${this.props.collapsed ? 'alert-container-collapsed' : ''}`}>
        {this.props.children}
      </div>
    );
  }
}
