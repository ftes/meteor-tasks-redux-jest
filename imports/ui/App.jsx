import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Tasks from '/imports/api/tasks';
import Task from './Task';
import AccountsUiWrapper from './AccountsUiWrapper';
import { setHideCompleted } from './actions';

const App = ({
  tasks, incompleteCount, hideCompleted, dispatch, currentUser,
}) => {
  let textInput;
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    Tasks.insert({
      text, createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().profile.name,
    });
    textInput.value = '';
  };

  return (
    <div className="container">
      <header>
        <h1>Todo List ({incompleteCount})</h1>

        <label className="hide-completed" htmlFor="hideCompleted">
          <input
            id="hideCompleted"
            type="checkbox"
            readOnly
            checked={hideCompleted}
            onClick={() => dispatch(setHideCompleted(!hideCompleted))}
          />
          Hide completed tasks
        </label>

        <AccountsUiWrapper />

        {currentUser &&
          <form className="new-task" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type to add new tasks"
              ref={(c) => { textInput = c; }}
            />
          </form>
        }
      </header>
      <ul>
        {tasks.filter(({ checked }) => !hideCompleted || !checked).map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  incompleteCount: PropTypes.number.isRequired,
  hideCompleted: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(),
};

App.defaultProps = {
  currentUser: null,
};

const AppWithTracker = withTracker(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
}))(App);

export default connect(({ hideCompleted }) => ({ hideCompleted }))(AppWithTracker);
