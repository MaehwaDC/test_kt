import {
  DELETE_TASK,
  EDIT_TASK,
  GET_TASKS,
} from './types';

import api from '../../api';

export const deleteTask = (taskId) => async (dispatch, getState) => {
  const index = getState().tasks.list.findIndex(task => task.id === taskId);
  await api.tasks.deleteTask(index);
  dispatch({ type: DELETE_TASK, payload: taskId });
}
export const fetchTasks = () => async (dispatch) => {
  let data = await api.tasks.getTasks();
  dispatch({ type: GET_TASKS, payload: data });
}

export const updateTasks = (tasks) => async (dispatch) => {
  console.log('123', 123)
  dispatch({ type: GET_TASKS, payload: tasks });
}

export const onUpdateTasksHendler = (page = 1, limit = 9) => (dispatch) => {
  api.tasks.updateTasksHendler(
    page,
    limit, 
    (snapshot) => updateTasks(snapshot.val())(dispatch)
  );
}

export const updateTask = (task, id) => async (dispatch, getState) => {
  const count = getState().tasks.list.length;
  dispatch({ type: EDIT_TASK, payload: task });
  await api.tasks.updateTask(task, count, id);
}
