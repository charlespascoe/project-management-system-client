import React from 'react';
import { bindValue } from 'client/views/bind';
import Dialogue from 'client/views/dialogues/dialogue';
import AddUserDialogueViewmodel from 'client/viewmodels/dialogues/admin/add-user-dialogue-viewmodel';
import { LoadingAlert, DangerAlert } from 'client/views/alerts';

export default class AddUserDialogue extends Dialogue {
  constructor(props) {
    super(props, AddUserDialogueViewmodel.createDefault());
    this.title = 'Create User';
  }

  addUser(e) {
    e.preventDefault();
    this.viewmodel.addUser();
  }

  renderBody() {
    return (
      <div className='modal-body'>
        <form onSubmit={this.addUser.bind(this)} className='space-controls'>
          <label htmlFor='inputFirstName' className='sr-only'>First Name</label>
          <input
            id='inputFirstName'
            className={`form-control ${this.viewmodel.firstNameValid ? '' : 'invalid'}`}
            placeholder='First Name'
            required
            autoComplete='off'
            value={this.viewmodel.firstName}
            maxLength='64'
            onChange={bindValue(this.viewmodel, 'firstName')}
            onBlur={() => this.viewmodel.firstNameEntered()}
            disabled={this.viewmodel.loading}
            autoFocus
          />
          <label htmlFor='inputOtherNames' className='sr-only'>Other Names</label>
          <input
            id='inputOtherNames'
            className={`form-control ${this.viewmodel.otherNamesValid ? '' : 'invalid'}`}
            placeholder='Other Names'
            required
            autoComplete='off'
            value={this.viewmodel.otherNames}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'otherNames')}
            onBlur={() => this.viewmodel.otherNamesEntered()}
            disabled={this.viewmodel.loading}
          />
          <label htmlFor='inputEmail' className='sr-only'>Email</label>
          <input
            id='inputEmail'
            className={`form-control ${this.viewmodel.emailValid ? '' : 'invalid'}`}
            placeholder='Email'
            required
            autoComplete='off'
            value={this.viewmodel.email}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'email')}
            onBlur={() => this.viewmodel.emailEntered()}
            disabled={this.viewmodel.loading}
          />
        </form>
        {this.viewmodel.loading ? <LoadingAlert message='Creating user...' /> : ''}
        {this.viewmodel.errorMessage ? <DangerAlert message={this.viewmodel.errorMessage} /> : ''}
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-default' onClick={() => this.dismiss()}>Cancel</button>
        <button
          type='button'
          className='btn btn-success'
          onClick={() => this.viewmodel.addUser()}
          disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
            Create User
        </button>
      </div>
    );
  }
}
