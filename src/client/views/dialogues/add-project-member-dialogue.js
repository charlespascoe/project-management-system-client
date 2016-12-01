import React from 'react';
import Dialogue from 'client/views/dialogues/dialogue';
import AddProjectMemberDialogueViewmodel from 'client/viewmodels/dialogues/add-project-member-dialogue-viewmodel';
import { bindValue } from 'client/views/bind';
import InputLabel from 'client/views/input-label';
import { LoadingAlert, WarningAlert, DangerAlert } from 'client/views/alerts';

export default class AddProjectMemberDialogue extends Dialogue {
  constructor(props) {
    super(props, AddProjectMemberDialogueViewmodel.createDefault(props.project));
    this.title = 'Add Project Member';
  }

  renderBody() {
    return (
      <div className='modal-body' id='add-project-member-dialogue'>
        <div className='row'>
          <div className='col-sm-6'>
            <InputLabel forId='selectUser' label='User' />
            <select
              className='form-control'
              id='selectUser'
              value={this.viewmodel.selectedUser}
              disabled={this.viewmodel.loading}
              onChange={bindValue(this.viewmodel, 'selectedUser')}>
                <option disabled value=''>Select User...</option>
                {this.viewmodel.nonMembers.map(nm => <option key={nm.id} value={nm.id}>{nm.name}</option>)}
            </select>
          </div>
          <div className='col-sm-6'>
            <InputLabel forId='selectRole' label='Role' />
            <select
              className='form-control'
              id='selectRole'
              value={this.viewmodel.selectedRole}
              disabled={this.viewmodel.loading}
              onChange={bindValue(this.viewmodel, 'selectedRole')}>
                <option disabled value=''>Select Role...</option>
                {this.viewmodel.roles.map(roleVm => <option key={roleVm.id} value={roleVm.id}>{roleVm.name}</option>)}
            </select>
          </div>
        </div>
        {this.viewmodel.loading ? <LoadingAlert message='Loading...' /> : ''}
        {this.viewmodel.errorMessage ? <DangerAlert message={this.viewmodel.errorMessage} /> : ''}
        {this.viewmodel.warningMessage ? <WarningAlert htmlMessage={this.viewmodel.warningMessage} /> : ''}
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
          onClick={() => this.viewmodel.addMember()}
          disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
            Add Member
        </button>
      </div>
    );
  }
}
