import React from 'react';
import View from 'client/views/view';

export default class Dialogue extends View {
  constructor(props, viewmodel) {
    super(props, viewmodel);

    this.state = {
      visible: false
    };

    this.dismiss = this.dismiss.bind(this);

    this.viewmodel.onDismiss = this.dismiss;

    setTimeout(function () {
      this.setState({visible: !this.state.visible});
    }.bind(this), 1000);
  }

  dismiss(result = null) {
    this.setState({visible: false});

    setTimeout(function () {
      if (this.onDismiss) this.onDismiss(result);
    }.bind(this), 150); // 150ms is duration of fade out transition
  }

  renderFooter() {
    return '';
  }

  render() {
    return (
      <div className={`modal fade visible ${this.state.visible ? 'in' : ''}`} tabIndex='-1' role='dialog' onClick={this.dismiss}>
        <div className='modal-dialog' role='document' onClick={e => e.stopPropagation()}>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' aria-label='Close' onClick={this.dismiss}><span aria-hidden='true'>&times;</span></button>
              <h4 className='modal-title text-center'>{this.title}</h4>
            </div>
            {this.renderBody()}
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }
}
