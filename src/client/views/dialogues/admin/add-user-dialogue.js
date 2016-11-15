import React from 'react';
import { bindValue } from 'client/views/bind';
import Dialogue from 'client/views/dialogues/dialogue';
import AddUserDialogueViewmodel from 'client/viewmodels/dialogues/admin/add-user-dialogue-viewmodel';

export default class AddUserDialogue extends Dialogue {
  constructor(props) {
    super(props, AddUserDialogueViewmodel.createDefault());
    this.title = 'Create User';
  }

  async addUser(e) {

  }

  renderBody() {
    return (
      <div className='modal-body'>
        <form onSubmit={async (e) => await this.addUser(e)} className='space-controls'>
          <label htmlFor='inputFirstName' className='sr-only'>First Name</label>
          <input
            id='inputFirstName'
            className={`form-control ${this.viewmodel.firstNameVaild ? '' : 'invalid'}`}
            placeholder='First Name'
            required
            autoComplete='off'
            value={this.viewmodel.firstName}
            maxLength='64'
            onChange={bindValue(this.viewmodel, 'firstName')}
            onBlur={() => this.viewmodel.firstNameEntered()}
            autoFocus
          />
          <label htmlFor='inputOtherNames' className='sr-only'>Other Names</label>
          <input
            id='inputOtherNames'
            className={`form-control ${this.viewmodel.otherNamesVaild ? '' : 'invalid'}`}
            placeholder='Other Names'
            required
            autoComplete='off'
            value={this.viewmodel.otherNames}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'otherNames')}
            onBlur={() => this.viewmodel.otherNamesEntered()}
          />
          <label htmlFor='inputEmail' className='sr-only'>Email</label>
          <input
            id='inputEmail'
            className={`form-control ${this.viewmodel.emailVaild ? '' : 'invalid'}`}
            placeholder='Email'
            required
            autoComplete='off'
            value={this.viewmodel.email}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'email')}
            onBlur={() => this.viewmodel.emailEntered()}
          />
        </form>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-default' onClick={this.dismiss}>Cancel</button>
        <button
          type='button'
          className='btn btn-success'
          onClick={async () => this.viewmodel.addUser()}
          disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
            Create User
        </button>
      </div>
    );
  }
}
