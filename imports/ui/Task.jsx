import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tasks from '/imports/api/tasks';

const deleteTask = ({ _id }) => Tasks.remove(_id);

const toggleChecked = ({ _id, checked }) =>
  Tasks.update(_id, { $set: { checked: !checked } });

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

    <span className="text">{task.text}</span>
  </li>
);

Task.propTypes = {
  task: PropTypes.shape().isRequired,
};

export default Task;
