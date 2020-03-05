import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK
} from './types';

export const createTask = (taskValue) => (dispatch, getState) => {
  dispatch({ type: CREATE_TASK , payload: { id: getState().tasks.list.length, content: taskValue } });
}

export const deleteTask = (taskId) => (dispatch) => {
  dispatch({ type: DELETE_TASK, payload: taskId });
}

export const editTask = (taskId, taskValue) => (dispatch) => {
  dispatch({ type: EDIT_TASK, payload: { id: taskId, content: taskValue } });
}
