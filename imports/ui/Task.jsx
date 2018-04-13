import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task }) => (
  <li>{task.text}</li>
);

Task.propTypes = {
  task: PropTypes.shape().isRequired,
};

export default Task;
