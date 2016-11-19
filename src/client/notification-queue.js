import React from 'react';
import Utils from 'client/utils'
import {
  SuccessNotification,
  InfoNotification,
  WarningNotification,
  DangerNotification
} from 'client/views/notifications';

const ANIMATION_DURATION = 250,
      NOTIFICATION_DURATION = 5000;

class NotificationQueue {
  get currentNotification() { return this._currentNotification; }
  set currentNotification(value) {
    this._currentNotification = value;
    if (this.onNotificationChange) this.onNotificationChange();
  }

  constructor() {
    this.queue = [];
    this.currentNotification = null;
  }

  showSuccessNotification(message) {
    this.showNotification(SuccessNotification, {message: message});
  }

  showInfoNotification(message) {
    this.showNotification(InfoNotification, {message: message});
  }

  showWarningNotification(message) {
    this.showNotification(WarningNotification, {message: message});
  }

  showDangerNotification(message) {
    this.showNotification(DangerNotification, {message: message});
  }

  showNotification(elm, props = {}) {
    var notification = {
      elm: elm,
      props: props
    };

    if (this.currentNotification == null) {
      this.currentNotification = notification;
      setTimeout(this.dismissNotification.bind(this), ANIMATION_DURATION + NOTIFICATION_DURATION);
    } else if (this.currentNotification.elm !== notification.elm || !Utils.shallowEquals(this.currentNotification.props, notification.props))  {
      this.queue.push(notification);
    }
  }

  renderNotification () {
    return this.currentNotification ? <this.currentNotification.elm {...this.currentNotification.props} /> : '';
  }

  dismissNotification() {
    if (!this.currentNotification) return;
    this.currentNotification.props.hide = true;
    if (this.onNotificationChange) this.onNotificationChange();

    setTimeout(this.notificationDismissed.bind(this), ANIMATION_DURATION);
  }

  notificationDismissed() {
    this.currentNotification = null;

    if (this.queue.length > 0) {
      this.currentNotification = this.queue.splice(0, 1)[0];
      setTimeout(this.dismissNotification.bind(this), ANIMATION_DURATION + NOTIFICATION_DURATION);
    } else {
      this.currentNotification = null;
    }
  }
}

export default new NotificationQueue();
