import 'client/views';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'client/navigation/router';
import viewMap from 'client/navigation/view-map';
import { LoadingAlert } from 'client/views/alerts';
import homeNavigator from 'client/navigation/home-navigator';
import NavBar from 'client/views/navbar';
import notificationQueue from 'client/notification-queue';
import dialogueManager from 'client/managers/dialogue-manager';

class App extends Component {
  componentDidMount() {
    homeNavigator.startApp();
  }

  constructor() {
    super();
    this.state = {
      view: null,
      notification: null,
      dialogue: null
    };
    router.changeView = this.changeView.bind(this);
    notificationQueue.onNotificationChange = this.changeNotification.bind(this);
    dialogueManager.onDialogueChange = this.changeDialogue.bind(this);
  }

  changeView(nav) {
    this.setState({view: viewMap.getView(nav.viewId), nav: nav});
  }

  changeNotification() {
    this.setState({notification: notificationQueue.renderNotification()});
  }

  changeDialogue() {
    this.setState({dialogue: dialogueManager.renderDialogue()});
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.view ?
          <this.state.view nav={this.state.nav} />
        :
          <div className='container'>
            <div className='loading-container absolute-center'>
              <LoadingAlert message='Loading...' />
            </div>
          </div>
        }
        {this.state.dialogue}
        {this.state.notification}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
