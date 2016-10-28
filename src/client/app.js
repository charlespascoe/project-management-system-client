import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'client/navigation/router';
import viewMap from 'client/navigation/view-map';
import LoginView from 'client/views/login-view';
import { SuccessNotification } from 'client/views/notifications';

class App extends Component {
  constructor() {
    super();
    this.state = {view: LoginView,h:false};
    router.changeView = this.changeView.bind(this);
    setTimeout(function () { this.setState({h:true}); }.bind(this), 2000);
  }

  changeView(viewId, navArgs) {
    this.setState({view: viewMap.getView(viewId), navArgs: navArgs});
  }

  render() {
    return (
      <div>
        <this.state.view navArgs={this.state.navArgs} />
        <SuccessNotification message="test" hide={this.state.h} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('body'));
