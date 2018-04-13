/* globals document, window */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';

import App from '/imports/ui/App';
import reducer from '/imports/ui/reducer';
import '/imports/startup/accounts-config';

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('render-target')
  );
});
