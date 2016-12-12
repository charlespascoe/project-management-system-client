import React from 'react';
import View from 'client/views/view';
import EditTaskViewmodel from 'client/viewmodels/edit-task-viewmodel';
import InputLabel from 'client/views/input-label';
import bind from 'client/views/bind';
import { LoadingAlert } from 'client/views/alerts';

export default class EditTaskView extends View {
  constructor(props) {
    super(props, EditTaskViewmodel.createDefault());
  }

  render() {
    return (
      <div id='edit-task-view'>
        <div className='container-flex header-bar'>
          <div className='container' style={{padding: 0}}>
            <img id='project-icon' src={this.viewmodel.iconUrl} alt={`${this.viewmodel.projectName} icon`}></img>
            <h1 id='project-title'>Add Task to <b>{this.viewmodel.projectName}</b><br /><small>{this.viewmodel.projectId}</small></h1>
          </div>
        </div>
        <div className='container'>
          <form onSubmit={() => this.viewmodel.save()} className='space-controls always-space'>
            <InputLabel forId='inputSummary' label='Summary' hint='Up to 256 characters, required' invalid={!this.viewmodel.summaryValid} />
            <input
              id='inputSummary'
              className={`form-control ${this.viewmodel.summaryValid ? '' : 'invalid'}`}
              placeholder='e.g. Create design document'
              required
              maxLength='256'
              {...bind('value', this.viewmodel, 'summary')}
              onBlur={() => this.viewmodel.summaryEntered()}
              disabled={this.viewmodel.loading}
            />
            <div className='row'>
              <div className='col-md-6'>
                <InputLabel forId='inputPriority' label='Priority' />
                <select
                  id='inputPriority'
                  className={`form-control`}
                  {...bind('value', this.viewmodel, 'priority')}
                  disabled={this.viewmodel.loading}>
                    <option value='1'>P1</option>
                    <option value='2'>P2</option>
                    <option value='3'>P3</option>
                    <option value='4'>P4</option>
                    <option value='5'>P5</option>
                </select>
              </div>
              <div className='col-md-6'>
                <InputLabel forId='inputEstEffort' label='Estimated Effort' hint='Hours (h) and minutes (m), required' invalid={!this.viewmodel.estimatedEffortValid} />
                <input
                  id='inputEstEffort'
                  className={`form-control ${this.viewmodel.estimatedEffortValid ? '' : 'invalid'}`}
                  placeholder='e.g. 2h 15m'
                  required
                  maxLength='16'
                  {...bind('value', this.viewmodel, 'estimatedEffort')}
                  onBlur={() => this.viewmodel.estimatedEffortEntered()}
                  disabled={this.viewmodel.loading}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <InputLabel forId='inputTargetCompletionDate' label='Target Completion Date' hint='DD/MM/YYYY, required' invalid={!this.viewmodel.targetCompletionDateValid} />
                <input
                  id='inputTargetCompletionDate'
                  className={`form-control ${this.viewmodel.targetCompletionDateValid ? '' : 'invalid'}`}
                  placeholder='e.g. 28/03/2017'
                  maxLength='16'
                  {...bind('value', this.viewmodel, 'targetCompletionDate')}
                  onBlur={() => this.viewmodel.targetCompletionDateEntered()}
                  disabled={this.viewmodel.loading}
                />
              </div>
              <div className='col-md-6'>
                <InputLabel forId='inputAssignee' label='Assignee' />
                <select
                  id='inputAssignee'
                  className={`form-control`}
                  {...bind('value', this.viewmodel, 'assignee')}
                  disabled={this.viewmodel.loading}>
                    <option value=''>Unassigned</option>
                    {this.viewmodel.projectMembers.map(member => <option value={member.user.id} key={member.user.id}>{member.user.name}</option>)}
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <InputLabel forId='inputDescription' label='Description' hint='Optional' />
                <textarea
                  id='inputDescription'
                  className='form-control'
                  placeholder='e.g. Create the design documents for Bob'
                  maxLength='65536'
                  {...bind('value', this.viewmodel, 'description')}
                  disabled={this.viewmodel.loading}
                />
              </div>
            </div>
            {this.viewmodel.loading ? <LoadingAlert message='Loading...' /> : ''}
            <div>
              <button type='button' className='btn btn-default' onClick={() => this.viewmodel.back()}>Cancel</button>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => this.viewmodel.save()}
                disabled={this.viewmodel.loading || !this.viewmodel.allValid}>
                  Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
