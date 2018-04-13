import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.container);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  container;

  render = () => <span ref={(c) => { this.container = c; }} />;
}
