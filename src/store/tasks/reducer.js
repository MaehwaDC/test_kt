import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK
} from './types';

const initialState = {
  list: [{ content: 'qwe', id: 1, }, { content: 'qwe1', id: 2 }, { content: 'qwe2', id: 3 }, { content: 'qwe3', id: 4 }],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK: {
      return { ...state, tasks: [...state.tasks, action.payload]}
    }
    case DELETE_TASK: {
      return { ...state, tasks: state.tasks.slice()}
    }
    case EDIT_TASK: {
      return { ...state, tasks: [...state.tasks, action.payload]}
    }
    default: {
      return state;
    }
  }
}