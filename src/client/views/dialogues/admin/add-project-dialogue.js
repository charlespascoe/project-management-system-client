import React from 'react';
import { bindValue } from 'client/views/bind';
import Dialogue from 'client/views/dialogues/dialogue';
import AddProjectDialogueViewmodel from 'client/viewmodels/dialogues/admin/add-project-dialogue-viewmodel';
import { LoadingAlert, WarningAlert, DangerAlert } from 'client/views/alerts';

export default class AddProjectDialogue extends Dialogue {
  constructor(props) {
    super(props, AddProjectDialogueViewmodel.createDefault());
    this.title = 'Create Project';
  }

  addProject(e) {
    e.preventDefault();
    this.viewmodel.addProject();
  }

  renderBody() {
    return (
      <div className='modal-body'>
        <form onSubmit={this.addProject.bind(this)} className='space-controls'>
          <label htmlFor='inputProjectID' className='sr-only'>Project ID</label>
          <input
            id='inputProjectID'
            className={`form-control ${this.viewmodel.projectIDValid ? '' : 'invalid'}`}
            placeholder='Project ID'
            required
            autoComplete='off'
            value={this.viewmodel.projectID}
            maxLength='64'
            onChange={bindValue(this.viewmodel, 'projectID')}
            onBlur={() => this.viewmodel.projectIDEntered()}
            disabled={this.viewmodel.loading}
            autoFocus
          />
          <label htmlFor='inputProjectName' className='sr-only'>Project Name</label>
          <input
            id='inputProjectName'
            className={`form-control ${this.viewmodel.projectNameValid ? '' : 'invalid'}`}
            placeholder='Project Name'
            required
            autoComplete='off'
            value={this.viewmodel.projectName}
            maxLength='128'
            onChange={bindValue(this.viewmodel, 'projectName')}
            onBlur={() => this.viewmodel.projectNameEntered()}
            disabled={this.viewmodel.loading}
          />
        </form>
        {this.viewmodel.loading ? <LoadingAlert message='Creating project...' /> : ''}
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
          onClick={() => this.viewmodel.addProject()}
          disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
            Create Project
        </button>
      </div>
    );
  }
}
