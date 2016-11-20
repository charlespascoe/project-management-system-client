import React from 'react';
import { bindValue } from 'client/views/bind';
import Dialogue from 'client/views/dialogues/dialogue';
import AddProjectDialogueViewmodel from 'client/viewmodels/dialogues/admin/add-project-dialogue-viewmodel';
import InputLabel from 'client/views/input-label';
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
          <InputLabel forId='inputProjectID' label='Project ID' hint='Required, A-Z uppercase only' invalid={!this.viewmodel.projectIDValid} />
          <input
            id='inputProjectID'
            className={`form-control ${this.viewmodel.projectIDValid ? '' : 'invalid'}`}
            placeholder='e.g. EXAMPLE'
            required
            autoComplete='off'
            value={this.viewmodel.projectID}
            maxLength='16'
            onChange={bindValue(this.viewmodel, 'projectID')}
            onBlur={() => this.viewmodel.projectIDEntered()}
            disabled={this.viewmodel.loading}
            autoFocus
          />
          <InputLabel forId='inputProjectName' label='Project Name' hint='Required' invalid={!this.viewmodel.projectNameValid} />
          <input
            id='inputProjectName'
            className={`form-control ${this.viewmodel.projectNameValid ? '' : 'invalid'}`}
            placeholder='e.g. Example Project'
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
          onClick={() => this.viewmodel.addProject()}
          disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
            Create Project
        </button>
      </div>
    );
  }
}
