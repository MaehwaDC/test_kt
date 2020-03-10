import { DELETE_TASK, EDIT_TASK, UPDATE_TASKS, UPDATE_SIZE, SET_SELECTED_TASK } from './types';

import api from '../../api';

export const deleteTask = taskId => async dispatch => {
  await api.tasks.deleteTask(taskId);
  dispatch({ type: DELETE_TASK, payload: taskId });
}

export const updateTasks = (res) => async (dispatch) => {
  const { data, totalCount } = res;
  if (data) {
    dispatch({ type: UPDATE_TASKS, payload: data });
  }

  if (totalCount) {
    dispatch({ type: UPDATE_SIZE, payload: totalCount });
  }
}

export const onUpdateTasksHandler = (page = 1, limit = 9, pagesCount) => (dispatch) => {
  return api.tasks.updateTasksHandler(
    page,
    limit, 
    (data) => updateTasks(data)(dispatch),
    pagesCount
  );
};

export const fetchTask = (id) => async (dispatch) => {
  const task = await api.tasks.fetchTask(id);

  dispatch({ type: SET_SELECTED_TASK, payload: task });
}

export const updateTask = (task, id) => async (dispatch) => {
  dispatch({ type: EDIT_TASK, payload: task });
  await api.tasks.updateTask(task, id);
};
