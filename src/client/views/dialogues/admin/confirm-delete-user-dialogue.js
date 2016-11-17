import React from 'react';
import Dialogue from 'client/views/dialogues/dialogue';

export default class ConfirmDeleteUserDialogue extends Dialogue {
  constructor(props) {
    super(props, null);
    this.title = 'Confirm Delete User';
  }

  renderBody() {
    return (
      <div className='modal-body'>
        <p className='text-center'>Are you sure you want to remove {this.props.name} as a user?</p>
        <p className='text-center'>This cannot be undone.</p>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-default' onClick={() => this.dismiss(false)}>Cancel</button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => this.dismiss(true)}>
            Delete User
        </button>
      </div>
    );
  }
}
