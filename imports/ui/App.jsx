import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '/imports/api/tasks';
import Task from './Task';

const App = ({ tasks }) => (
  <div className="container">
    <header>
      <h1>Todo List</h1>
    </header>
    <ul>
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </ul>
  </div>
);

App.propTypes = {
  tasks: PropTypes.shape().isRequired,
};

export default withTracker(() => ({
  tasks: Tasks.find({}).fetch(),
}))(App);
