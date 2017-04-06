import React from 'react';
import View from 'client/views/view';
import ViewTaskViewmodel from 'client/viewmodels/view-task-viewmodel';
import CollapsiblePanel from 'client/views/collapsible-panel';
import {
  durationConverter,
  dateFormatter,
  priorityConverter
} from 'client/views/converters';

export default class ViewTaskView extends View {
  constructor(props) {
    super(props, ViewTaskViewmodel.createDefault());
  }

  render() {
    return (
      <div id='view-task-view'>
        <div className='container-flex header-bar'>
          {!this.viewmodel.task ? '' :
          <div className='container' style={{padding: 0}}>
              <img id='project-icon' src={this.viewmodel.projectIconUrl} alt={`${this.viewmodel.projectName} icon`}></img>
              <h1 id='task-title'>Task <b>{this.viewmodel.projectId}-{this.viewmodel.taskId}</b><br /><small>{this.viewmodel.summary}</small></h1>
          </div>
          }
        </div>
        {!this.viewmodel.task ? '' :
        <div className='container'>
          <div className='row'>
            <div className='col-md-5'>
              <CollapsiblePanel id='details' title='Details' type='primary' padding>
                <p className='key'>Project</p><p className='value'>{this.viewmodel.projectName}</p>
                <p className='key'>Priority</p><p className='value'>{priorityConverter(this.viewmodel.priority)}</p>
                <p className='key'>Assignee</p><p className='value'>{this.viewmodel.assignee}</p>
                <p className='key'>Estimate</p><p className='value'>{durationConverter(this.viewmodel.estEffort)}</p>
                <p className='key'>Worked Effort</p><p className='value'>{durationConverter(this.viewmodel.workedEffort)}</p>
                <p className='key'>Target Date</p><p className='value'>{dateFormatter(this.viewmodel.targetDate)}</p>
                <p className='key'>State</p><p className='value'>{this.viewmodel.state}</p>
              </CollapsiblePanel>
            </div>
            <div className='col-md-7'>
              <CollapsiblePanel id='description' title='Description' type='primary' padding>
                <p>{this.viewmodel.description || 'Lorem Ipsum'}</p>
              </CollapsiblePanel>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
