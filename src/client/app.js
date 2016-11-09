import 'client/views';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import router from 'client/navigation/router';
import viewMap from 'client/navigation/view-map';
import homeNavigator from 'client/navigation/home-navigator';
import NavBar from 'client/views/navbar';
import { SuccessNotification } from 'client/views/notifications';

class App extends Component {
  componentDidMount() {
    homeNavigator.startApp();
  }

  constructor() {
    super();
    this.state = {view: null};
    router.changeView = this.changeView.bind(this);
  }

  changeView(nav) {
    this.setState({view: viewMap.getView(nav.viewId), nav: nav});
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.view ? <this.state.view nav={this.state.nav} /> : ''}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
