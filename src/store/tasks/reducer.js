import { GET_TASKS } from './types';

const initialState = {
  list: [],
  size: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      const { data, size } = action.payload;
      return { ...state, list: data || [], size };
    }
    default: {
      return state;
    }
  }
};
