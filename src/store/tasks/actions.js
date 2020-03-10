import {
  DELETE_TASK,
  EDIT_TASK,
  GET_TASKS,
} from './types';

import api from '../../api';

export const deleteTask = (taskId) => async (dispatch) => {
  await api.tasks.deleteTask(taskId);
  dispatch({ type: DELETE_TASK, payload: taskId });
}

export const updateTasks = (data) => async (dispatch) => {
  dispatch({ type: GET_TASKS, payload: data });
}

export const onUpdateTasksHandler = (page = 1, limit = 9) => (dispatch) => {
  return api.tasks.updateTasksHandler(
    page,
    limit, 
    (data) => updateTasks(data)(dispatch)
  );
}

export const updateTask = (task, id) => async (dispatch) => {
  dispatch({ type: EDIT_TASK, payload: task });
  await api.tasks.updateTask(task, id);
}
