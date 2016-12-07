import React from 'react';
import View from 'client/views/view';
import HomeViewmodel from 'client/viewmodels/home-viewmodel';
import CollapsiblePanel from 'client/views/collapsible-panel';
import Icon from 'client/views/icon';
import { LoadingAlert, AlertContainer } from 'client/views/alerts';

function AssignmentView(props) {
  return (
    <tr>
      <td>{props.viewmodel.id}</td>
      <td>{props.viewmodel.projectName}</td>
      <td>{props.viewmodel.roleName}</td>
      <td className='view-project button' onClick={() => props.viewmodel.goToProject()}>
        <Icon type='chevron-right absolute-center' />
      </td>
    </tr>
  );
}

export default class HomeView extends View {
  constructor(props) {
    super(props, HomeViewmodel.createDefault());
  }

  render() {
    return (
      <div id='home-view'>
        <div className='container-flex header-bar'>
          <h1 className='text-center'>Home</h1>
        </div>
        <div className='container'>
          <AlertContainer collapsed={!this.viewmodel.loadingAssignments}>
            <LoadingAlert message='Loading...' />
          </AlertContainer>
          <CollapsiblePanel title='My Projects' type='primary' padding={false}>
            <table className='table table-striped no-margin' id='user-projects-table'>
              <colgroup>
                <col id='project-id-col' />
                <col id='project-name-col' />
                <col id='role-col' />
                <col id='view-project-col' />
              </colgroup>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Project Name</th>
                  <th>Role</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {this.viewmodel.assignments.map(assignmentVm => <AssignmentView viewmodel={assignmentVm} key={assignmentVm.id} />)}
              </tbody>
            </table>
          </CollapsiblePanel>
        </div>
      </div>
    );
  }
}
