import React from 'react';
import Dialogue from 'client/views/dialogues/dialogue';
import RequestElevationDialogueViewmodel from 'client/viewmodels/dialogues/request-elevation-dialogue-viewmodel';
import { LoadingAlert, DangerAlert } from 'client/views/alerts';
import { bindValue } from 'client/views/bind';

export default class RequestElevationDialogue extends Dialogue {
  constructor(props) {
    super(props, RequestElevationDialogueViewmodel.createDefault());
    this.title = 'Admin Elevation';
  }

  requestElevation(e) {
    e.preventDefault();
    this.viewmodel.requestElevation().catch(e => console.error(e));
  }

  renderBody() {
    return (
      <div className='modal-body'>
        <p className='text-center'>In order to have administrator rights, you will need to confirm your password.</p>
        <p className='text-center'>Remember to drop your rights once you have finished.</p>
        <form onSubmit={this.requestElevation.bind(this)}>
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
            disabled={this.viewmodel.loading}
          />
        </form>
        {this.viewmodel.loading ? <LoadingAlert message='Verifying...' /> : ''}
        {this.viewmodel.errorMessage ? <DangerAlert message={this.viewmodel.errorMessage} /> : ''}
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-default' onClick={this.dismiss}>Cancel</button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={this.requestElevation.bind(this)}
          disabled={this.viewmodel.loading || !this.viewmodel.password}>
            Elevate
        </button>
      </div>
    );
  }
}
