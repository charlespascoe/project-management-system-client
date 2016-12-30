import React from 'react';
import View from 'client/views/view';
import ViewTaskViewmodel from 'client/viewmodels/view-task-viewmodel';

export default class ViewTaskView extends View {
  constructor(props) {
    super(props, ViewTaskViewmodel.createDefault());
  }

  render() {
    return (
      <div id='view-task-view'>
        <div className='container-flex header-bar'>
          <div className='container' style={{padding: 0}}>
            <img id='project-icon' src={this.viewmodel.projectIconUrl} alt={`${this.viewmodel.projectName} icon`}></img>
            <h1 id='task-title'>Task <b>{this.viewmodel.projectId}-{this.viewmodel.taskId}</b><br /><small>{this.viewmodel.summary}</small></h1>
          </div>
        </div>
        <div className='container'>
          <p>Some content here</p>
        </div>
      </div>
    );
  }
}
