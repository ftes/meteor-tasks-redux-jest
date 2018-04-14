/* eslint-disable no-underscore-dangle */

export const Meteor = {
  isServer: false,
  Error: jest.fn(),
  methods: jest.fn(),
};

export function _set(props) {
  Object.keys(props).forEach((prop) => {
    Meteor[prop] = props[prop];
  });
}
