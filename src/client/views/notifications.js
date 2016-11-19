import React, { Component } from 'react';
import {
  SuccessAlert,
  InfoAlert,
  WarningAlert,
  DangerAlert
} from 'client/views/alerts';

class Notification extends Component {
  render() {
    return (
      <div className={`notification ${this.props.hide ? ' hidden-notification' : ''}`}>
        <div className='container'>
          <this.alert message={this.props.message} />
        </div>
      </div>
    );
  }
}

export class SuccessNotification extends Notification {
  constructor(props) {
    super(props);
    this.alert = SuccessAlert;
  }
}

export class InfoNotification extends Notification {
  constructor(props) {
    super(props);
    this.alert = InfoAlert;
  }
}

export class WarningNotification extends Notification {
  constructor(props) {
    super(props);
    this.alert = WarningAlert;
  }
}

export class DangerNotification extends Notification {
  constructor(props) {
    super(props);
    this.alert = DangerAlert;
  }
}
