import 'client/views';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'client/navigation/router';
import viewMap from 'client/navigation/view-map';
import homeNavigator from 'client/navigation/home-navigator';
import NavBar from 'client/views/navbar';
import notificationQueue from 'client/notification-queue';

class App extends Component {
  componentDidMount() {
    homeNavigator.startApp();
  }

  constructor() {
    super();
    this.state = {
      view: null,
      notification: null
    };
    router.changeView = this.changeView.bind(this);
    notificationQueue.onNotificationChange = this.changeNotification.bind(this);
  }

  changeView(nav) {
    this.setState({view: viewMap.getView(nav.viewId), nav: nav});
  }

  changeNotification() {
    this.setState({notification: notificationQueue.renderNotification()});
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.view ? <this.state.view nav={this.state.nav} /> : ''}
        {this.state.notification}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
