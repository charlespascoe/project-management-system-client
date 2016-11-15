import React, { Component } from 'react';

export default class CollapsiblePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    return (
      <div className={`panel panel-${this.props.type || 'default'} ${this.state.visible ? '' : 'panel-collapse'}`}>
        <div className='panel-heading' onClick={() => this.setState({visible: !this.state.visible})}>
          <h3 className='panel-title'>{this.props.title}<span className={`glyphicon glyphicon-menu-${this.state.visible ? 'up' : 'down'} pull-right toggle-icon`}></span></h3>
        </div>
        <div className={`panel-body ${this.props.padding ? '' : 'no-padding'}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
