import { SET_HIDE_COMPLETED } from './actions';

export default (state = { hideCompleted: false }, action) => {
  switch (action.type) {
    case SET_HIDE_COMPLETED:
      return {
        ...state,
        hideCompleted: action.value,
      };
    default:
      return state;
  }
};
