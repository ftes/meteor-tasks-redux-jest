import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Meteor } from 'meteor/meteor';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

const toggleChecked = ({ _id, checked }) => Meteor.call('tasks.setChecked', _id, !checked);

const Task = ({ task }) => (
  <li className={classNames({ checked: task.checked })}>
    <button className="delete" onClick={() => deleteTask(task)}>
      &times;
    </button>

    <input
      type="checkbox"
      readOnly
      checked={!!task.checked}
      onClick={() => toggleChecked(task)}
    />

    <span className="text"><strong>{task.username}</strong>: {task.text}</span>
  </li>
);

Task.propTypes = {
  task: PropTypes.shape().isRequired,
};

export default Task;
