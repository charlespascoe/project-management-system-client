import View from 'client/views/view';
import React from 'react';
import { bindValue } from 'client/views/bind';
import LoginViewmodel from 'client/viewmodels/login-viewmodel';
import { LoadingAlert, DangerAlert } from 'client/views/alerts';
import { PrimaryButton } from 'client/views/buttons';
import catchHandler from 'client/catch-handler';

export default class LoginView extends View {
  constructor(props) {
    super(props, LoginViewmodel.createDefault());
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.login();
  }

  login() {
    catchHandler(this.viewmodel.login());
  }

  render() {
    return (
      <div>
        <header>
          <h1 className='text-center'>Login</h1>
        </header>

        <form className="form-signin" id="signin" onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='inputUsername' className='sr-only'>Username</label>
          <input
            type='text'
            id='inputUsername'
            className='form-control'
            placeholder='Username'
            required
            autoFocus
            autoComplete='off'
            value={this.viewmodel.username}
            onChange={bindValue(this.viewmodel, 'username')}
          />

          <label htmlFor='inputPassword' className='sr-only'>Password</label>
          <input
            type='password'
            id='inputPassword'
            className='form-control'
            placeholder='Password'
            required
            autoComplete='off'
            value={this.viewmodel.password}
            onChange={bindValue(this.viewmodel, 'password')}
          />

          <PrimaryButton text='Log in' disabled={!this.viewmodel.isValid || this.viewmodel.loading} onClick={this.login.bind(this)} />
          {this.viewmodel.loading ? <LoadingAlert message='Signing in...' /> : ''}
          {this.viewmodel.errorMessage ? <DangerAlert message={this.viewmodel.errorMessage} /> : ''}
        </form>
      </div>
    );
  }
}
