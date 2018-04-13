import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '/imports/api/tasks';
import Task from './Task';

const App = ({ tasks }) => {
  let textInput;
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    Tasks.insert({ text, createdAt: new Date() });
    textInput.value = '';
  };

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>

        <form className="new-task" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type to add new tasks"
            ref={(c) => { textInput = c; }}
          />
        </form>
      </header>
      <ul>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => ({
  tasks: Tasks.find({}).fetch(),
}))(App);
