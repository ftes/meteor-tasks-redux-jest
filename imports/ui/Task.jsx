import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const toggleChecked = ({ _id, checked }) => Meteor.call('tasks.setChecked', _id, !checked);
const togglePrivate = ({ _id, isPrivate }) => Meteor.call('tasks.setPrivate', _id, !isPrivate);

const Task = ({ task, currentUserId }) => (
  <li
    className={classNames({
      checked: task.checked,
      private: task.isPrivate,
    })}
  >

    <button className="delete" onClick={() => deleteTask(task)}>
      &times;
    </button>

    <input
      type="checkbox"
      readOnly
      checked={!!task.checked}
      onClick={() => toggleChecked(task)}
    />

    {currentUserId === task.owner &&
      <button className="toggle-private" onClick={() => togglePrivate(task)}>
        {task.isPrivate ? 'Private' : 'Public'}
      </button>
    }

    <span className="text"><strong>{task.username}</strong>: {task.text}</span>
  </li>
);

Task.propTypes = {
  task: PropTypes.shape().isRequired,
  currentUserId: PropTypes.string,
};

Task.defaultProps = {
  currentUserId: null,
};

const TaskWithTracker = withTracker(() => ({
  currentUserId: Meteor.userId(),
}))(Task);

export default TaskWithTracker;
