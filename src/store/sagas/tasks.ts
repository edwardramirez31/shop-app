/* eslint-disable no-console */
import type { PayloadAction } from '@reduxjs/toolkit';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import type { CallEffect, PutEffect } from 'redux-saga/effects';

import DjangoTodo from '../../apis/djangoTodo';
import {
  addTask,
  addTaskError,
  addTaskSuccess,
  getTask,
  getTaskError,
  getTaskSuccess,
  removeTask,
  updateTask,
  updateTaskSuccess,
} from '../slices/tasks';
import type { DjangoTask } from '../slices/tasks';
import type { ErrorObject } from '../types/models';

function* addTaskSaga({
  payload: data,
}: PayloadAction<DjangoTask>): Generator<CallEffect | PutEffect, void, DjangoTask> {
  try {
    const newTask = yield call([DjangoTodo, 'createTask'], data);
    yield put(addTaskSuccess(newTask));
  } catch (err) {
    const error = err as ErrorObject;
    yield put(addTaskError(error.message));
  }
}

function* getTaskSaga(): Generator<CallEffect<DjangoTask[]> | PutEffect, void, DjangoTask[]> {
  try {
    const tasks = yield call([DjangoTodo, 'getTasks']);
    yield put(getTaskSuccess(tasks));
  } catch (err) {
    const error = err as ErrorObject;
    yield put(getTaskError(error.message));
  }
}

function* removeTaskSaga({ payload: id }: PayloadAction<number>): Generator<CallEffect, void> {
  try {
    yield call([DjangoTodo, 'deleteTask'], id);
  } catch (err) {
    const error = err as ErrorObject;
    console.log(error.message);
  }
}

function* updateTaskSaga({
  payload: { id, text, completed },
}: PayloadAction<DjangoTask>): Generator<CallEffect | PutEffect, void, DjangoTask> {
  try {
    const task = yield call([DjangoTodo, 'updateTask'], id, {
      text,
      completed,
    });
    yield put(updateTaskSuccess(task));
  } catch (err) {
    const error = err as ErrorObject;
    yield put(getTaskError(error.message));
  }
}

export default function* tasksSaga(): Generator {
  try {
    yield all([
      takeEvery(addTask, addTaskSaga),
      takeEvery(getTask, getTaskSaga),
      takeEvery(removeTask, removeTaskSaga),
      takeEvery(updateTask, updateTaskSaga),
    ]);
  } catch (error) {
    console.log(error);
  }
}
