import React from 'react';
import View from 'client/views/view';
import Icon from 'client/views/icon';
import ViewProjectViewmodel from 'client/viewmodels/view-project-viewmodel';
import { bindValue } from 'client/views/bind';
import { LoadingAlert, AlertContainer } from 'client/views/alerts';
import CollapsiblePanel from 'client/views/collapsible-panel';
import { ActionsGroup, ActionButton } from 'client/views/actions';

class TaskView extends View {
  constructor(props) {
    super(props, props.viewmodel);
  }

  render() {
    return (
      <tr>
        <td>{this.viewmodel.key}</td>
        <td>{this.viewmodel.summary}</td>
        <td className='view button' onClick={() => this.viewmodel.viewTask()}>
          <Icon type='chevron-right absolute-center' />
        </td>
      </tr>
    );
  }
}

function GenericTaskTable(props) {
  return (
    <table className='table table-striped no-margin'>
      <colgroup>
        <col id='key-col' />
        <col id='summary-col' />
        <col id='view-col' />
      </colgroup>
      <thead>
        <tr>
          <th>Key</th>
          <th>Summary</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(taskVm => <TaskView viewmodel={taskVm} key={taskVm.id} />)}
      </tbody>
    </table>
  );
}

export default class ViewProjectView extends View {
  constructor(props) {
    super(props, ViewProjectViewmodel.createDefault());
  }

  render() {
    return (
      <div id='view-project-view'>
        <div className='container-flex header-bar'>
          <div className='container' style={{padding: 0}}>
            <img id='project-icon' src={this.viewmodel.iconUrl} alt={`${this.viewmodel.projectName} icon`}></img>
            <h1 id='project-title'><b>{this.viewmodel.projectName}</b><br /><small>{this.viewmodel.projectId}</small></h1>
          </div>
        </div>
        <div className='container'>
          <ActionsGroup>
            <ActionButton onClick={() => this.viewmodel.addTask()}>Add Task</ActionButton>
          </ActionsGroup>

          <CollapsiblePanel title='Assigned to Me' type='primary'>
            <GenericTaskTable tasks={this.viewmodel.assignedToMeTasks} />
          </CollapsiblePanel>

          <CollapsiblePanel title='Unassigned Tasks' type='primary'>
            <GenericTaskTable tasks={this.viewmodel.unassignedTasks} />
          </CollapsiblePanel>

          <CollapsiblePanel title='Other Tasks' type='primary'>
            <GenericTaskTable tasks={this.viewmodel.otherTasks} />
          </CollapsiblePanel>

          <CollapsiblePanel title='Completed Tasks' type='primary'>
            <GenericTaskTable tasks={this.viewmodel.completedTasks} />
          </CollapsiblePanel>
        </div>
      </div>
    );
  }
}
