import React from 'react';
import Dialogue from 'client/views/dialogues/dialogue';

export default class ConfirmRemoveProjectMemberDialogue extends Dialogue {
  constructor(props) {
    super(props, null);
    this.title = 'Confirm Remove Member';
  }

  renderBody() {
    return (
      <div className='modal-body'>
        <p className='text-center'>Are you sure you want to remove {this.props.memberName} from {this.props.projectName}?</p>
        <p className='text-center'>Any tasks assigned to them will become 'Unassigned', but their work log entries will stay.</p>
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
            Remove Member
        </button>
      </div>
    );
  }
}
