import { DELETE_TASK, EDIT_TASK, GET_TASKS } from './types';

import api from '../../api';

export const deleteTask = taskId => async dispatch => {
  await api.tasks.deleteTask(taskId);
  dispatch({ type: DELETE_TASK, payload: taskId });
};
export const fetchTasks = (page = 1, limit = 9) => async dispatch => {
  let data = await api.tasks.getTasks(page, limit);
  dispatch({ type: GET_TASKS, payload: data });
};

export const updateTasks = tasks => async dispatch => {
  dispatch({ type: GET_TASKS, payload: tasks });
};

export const onUpdateTasksHandler = (page = 1, limit = 9) => dispatch => {
  api.tasks.updateTasksHandler(page, limit, snapshot =>
    updateTasks(snapshot.val())(dispatch),
  );
};

export const removeHandlers = () => {
  api.tasks.removeHandlers();
};

export const updateTask = (task, id) => async dispatch => {
  dispatch({ type: EDIT_TASK, payload: task });
  await api.tasks.updateTask(task, id);
};
