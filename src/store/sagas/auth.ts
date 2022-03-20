/* eslint-disable no-console */
import type { PayloadAction } from '@reduxjs/toolkit';
import { all, put, call, takeEvery, take } from 'redux-saga/effects';
import type { CallEffect, PutEffect, TakeEffect } from 'redux-saga/effects';

import type { ErrorObject, User } from '../types/models';

import AuthAPI from '@apis/auth';
import {
  getUser,
  getUserError,
  getUserSuccess,
  login,
  loginError,
  loginSuccess,
} from '@store/slices/auth';

function* loginSaga({
  payload: data,
}: PayloadAction<{ email: string; password: string }>): Generator<
  CallEffect | PutEffect | TakeEffect,
  void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  try {
    const token: string = yield call([AuthAPI, 'login'], data);
    yield put(getUser(token));
    const action: typeof getUserSuccess | typeof getUserError = yield take([
      getUserSuccess,
      getUserError,
    ]);
    if (action.type === getUserSuccess.type) {
      yield put(loginSuccess({ token }));
    }
  } catch (err) {
    const error = err as ErrorObject;
    yield put(loginError(error));
  }
}

function* getUserSaga({
  payload: token,
}: PayloadAction<string>): Generator<CallEffect<User> | PutEffect, void, User> {
  try {
    const user = yield call([AuthAPI, 'getUser'], token);
    yield put(getUserSuccess(user));
  } catch (err) {
    const error = err as ErrorObject;
    yield put(getUserError(error));
  }
}

export default function* authSaga(): Generator {
  try {
    yield all([takeEvery(login, loginSaga), takeEvery(getUser, getUserSaga)]);
  } catch (error) {
    console.log(error);
  }
}
