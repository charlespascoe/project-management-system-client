import React, { Component } from 'react';
import homeNavigator from 'client/navigation/home-navigator';
import adminNavtigator from 'client/navigation/admin-navigator';
import userManager from 'client/managers/user-manager';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      user: null
    };

    userManager.onUserChanged = () => {
      this.setState({user: userManager.user});
    };
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  async logout() {
    await homeNavigator.logout();
  }

  async requestElevation() {
    await homeNavigator.requestElevationDialogue();
  }

  async dropElevation() {
    await userManager.dropElevation();
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <div className='navbar-toggle collapsed pull-left' id='toggle-menu' aria-expanded='false' onClick={() => this.toggleMenu()}>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </div>
            <a className='navbar-brand'>Jeera</a>
          </div>
          <div className={'collapse navbar-collapse' + (this.state.menuOpen ? ' visible' : '')}>
            <ul className='nav navbar-nav navbar-right'>
              {this.state.user ? <li><p className='navbar-text'>Logged in as {this.state.user.name}</p></li> : ''}
              {this.state.user ? <li><a onClick={this.logout.bind(this)}>Logout</a></li> : ''}
              {this.state.user && this.state.user.sysadmin && !this.state.user.isSysadminElevated ? <li><a onClick={() => this.requestElevation()}>Elevate to Admin</a></li> : ''}
              {this.state.user && this.state.user.isSysadminElevated ? <li><a onClick={async () => await adminNavtigator.goToAdmin()}>Administration</a></li> : ''}
              {this.state.user && this.state.user.isSysadminElevated ? <li><a onClick={() => this.dropElevation()}>Drop Admin Elevation</a></li> : ''}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
