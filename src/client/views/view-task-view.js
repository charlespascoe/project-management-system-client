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
        <div className='container'>
          {!this.viewmodel.task ? '' :
            <CollapsiblePanel title='Details' type='primary'>
              <p>Project: {this.viewmodel.projectName}</p>
              <p>Priority: {priorityConverter(this.viewmodel.priority)}</p>
              <p>Assignee: {this.viewmodel.assignee}</p>
              <p>Estimate: {durationConverter(this.viewmodel.estEffort)}</p>
              <p>Worked Effort: {durationConverter(this.viewmodel.workedEffort)}</p>
              <p>Target Date: {dateFormatter(this.viewmodel.targetDate)}</p>
              <p>State: {this.viewmodel.state}</p>
            </CollapsiblePanel>
          }
        </div>
      </div>
    );
  }
}
