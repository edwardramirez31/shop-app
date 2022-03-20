import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';

export default function* rootSaga(): Generator {
  try {
    yield all([fork(authSaga)]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
