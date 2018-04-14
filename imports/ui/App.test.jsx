import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

const props = {
  tasks: [],
  dispatch: jest.fn(),
  incompleteCount: 0,
  hideCompleted: false,
};

describe('<App />', () => {
  const app = shallow(<App {...props} />);

  it('<App /> should render', () => {
    expect(app.exists()).toBe(true);
  });
});
