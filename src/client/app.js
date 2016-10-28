import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'client/navigation/router';
import viewMap from 'client/navigation/view-map';
import LoginView from 'client/views/login-view';

class App extends Component {
  constructor() {
    super();
    this.state = {view: LoginView};
    router.changeView = this.changeView.bind(this);
  }

  changeView(viewId, navArgs) {
    this.setState({view: viewMap.getView(viewId), navArgs: navArgs});
  }

  render() {
    return (
      <this.state.view navArgs={this.state.navArgs} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('body'));
