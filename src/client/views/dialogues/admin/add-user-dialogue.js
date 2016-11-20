import React from 'react';
import { bindValue } from 'client/views/bind';
import Dialogue from 'client/views/dialogues/dialogue';
import AddUserDialogueViewmodel from 'client/viewmodels/dialogues/admin/add-user-dialogue-viewmodel';
import InputLabel from 'client/views/input-label';
import { LoadingAlert, WarningAlert, DangerAlert } from 'client/views/alerts';

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
          <InputLabel forId='inputFirstName' label='First Name' hint='Required' invalid={!this.viewmodel.firstNameValid} />
          <input
            id='inputFirstName'
            className={`form-control ${this.viewmodel.firstNameValid ? '' : 'invalid'}`}
            placeholder='e.g. Bob'
            required
            autoComplete='off'
            value={this.viewmodel.firstName}
            maxLength='64'
            onChange={bindValue(this.viewmodel, 'firstName')}
            onBlur={() => this.viewmodel.firstNameEntered()}
            disabled={this.viewmodel.loading}
            autoFocus
          />
          <InputLabel forId='inputOtherNames' label='Other Names' hint='Required' invalid={!this.viewmodel.otherNamesValid} />
          <input
            id='inputOtherNames'
            className={`form-control ${this.viewmodel.otherNamesValid ? '' : 'invalid'}`}
            placeholder='e.g. Smith'
            required
            autoComplete='off'
            value={this.viewmodel.otherNames}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'otherNames')}
            onBlur={() => this.viewmodel.otherNamesEntered()}
            disabled={this.viewmodel.loading}
          />
          <InputLabel forId='inputEmail' label='Email' hint='Valid email required' invalid={!this.viewmodel.emailValid} />
          <input
            id='inputEmail'
            className={`form-control ${this.viewmodel.emailValid ? '' : 'invalid'}`}
            placeholder='e.g. bob.smith@mail.com'
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
        {this.viewmodel.warningMessage ? <WarningAlert message={this.viewmodel.warningMessage} /> : ''}
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
