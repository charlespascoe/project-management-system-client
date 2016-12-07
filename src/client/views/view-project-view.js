import React from 'react';
import View from 'client/views/view';
import Icon from 'client/views/icon';
import ViewProjectViewmodel from 'client/viewmodels/view-project-viewmodel';
import { bindValue } from 'client/views/bind';
import { LoadingAlert, AlertContainer } from 'client/views/alerts';
import CollapsiblePanel from 'client/views/collapsible-panel';
import { ActionsGroup, ActionButton } from 'client/views/actions';

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

          </CollapsiblePanel>

          <CollapsiblePanel title='Unassigned Tasks' type='primary'>

          </CollapsiblePanel>

          <CollapsiblePanel title='Other Tasks' type='primary'>

          </CollapsiblePanel>

          <CollapsiblePanel title='Completed Tasks' type='primary'>

          </CollapsiblePanel>
        </div>
      </div>
    );
  }
}
