import { UPDATE_TASKS, UPDATE_SIZE, SET_SELECTED_TASK } from './types';

const initialState = {
  list: [],
  totalCount: 0,
  selectedTask: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASKS: {
      return { ...state, list: action.payload };
    }
    case UPDATE_SIZE: {
      return { ...state, totalCount: action.payload };
    }
    case SET_SELECTED_TASK: {
      return { ...state, selectedTask: action.payload };
    }
    default: {
      return state;
    }
  }
};
