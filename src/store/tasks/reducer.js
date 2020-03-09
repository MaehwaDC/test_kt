import { GET_TASKS } from './types';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return { ...state, list: action.payload || [] };
    }
    default: {
      return state;
    }
  }
};
