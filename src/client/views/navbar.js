import React, { Component } from 'react';
import homeNavigator from 'client/navigation/home-navigator';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  }

  async logout() {
    await homeNavigator.logout();
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <div className='navbar-toggle collapsed pull-left' id='toggle-menu' aria-expanded='false' onClick={this.toggleMenu.bind(this)}>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </div>
            <a className='navbar-brand'>Jeera</a>
          </div>
          <div className={'collapse navbar-collapse' + (this.state.menuOpen ? ' visible' : '')}>
            <ul className='nav navbar-nav navbar-right'>
              <li><p className='navbar-text'>Logged in as Bob</p></li>
              <li><a href='#' onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
