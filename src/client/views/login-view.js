import View from 'client/views/view';
import React from 'react';
import { bindValue } from 'client/views/bind';
import LoginViewmodel from 'client/viewmodels/login-viewmodel';
import { LoadingAlert, DangerAlert } from 'client/views/alerts';

export default class LoginView extends View {
  constructor(props) {
    super(props, new LoginViewmodel());
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.viewmodel.username}
          onChange={bindValue(this.viewmodel, 'username')}
          disabled={this.viewmodel.loading}
        />
        <input
          type='password'
          value={this.viewmodel.password}
          onChange={bindValue(this.viewmodel, 'password')}
          disabled={this.viewmodel.loading}
        />
        {this.viewmodel.isValid && !this.viewmodel.loading ?
          <button type='button' onClick={() => this.viewmodel.login()}>Log in</button>
            : ''
        }
        {this.viewmodel.loading ? <LoadingAlert message='Signing in...' /> : '' }
      </div>
    );
  }
}
