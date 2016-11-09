import React from 'react';
import View from 'client/views/view';
import HomeViewmodel from 'client/viewmodels/home-viewmodel';

export default class HomeView extends View {
  constructor(props) {
    super(props, HomeViewmodel.createDefault());
  }

  render() {
    return (
      <h1>Home</h1>
    );
  }
}
