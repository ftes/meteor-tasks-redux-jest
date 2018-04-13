import React, { Component } from 'react';

import Task from './Task';

const tasks = [
  { _id: 1, text: 'This is task 1' },
  { _id: 2, text: 'This is task 2' },
  { _id: 3, text: 'This is task 3' },
]

export default class App extends Component {
  renderTasks = () => tasks.map(task => (
    <Task key={task._id} task={task} />
  ));

  render = () => (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      <ul>
        {this.renderTasks()}
      </ul>
    </div>
  );
}