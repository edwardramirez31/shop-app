import { expectSaga } from 'redux-saga-test-plan';

import rootSaga from '..';
import { rootReducer } from '../..';

import AuthAPI from '@apis/auth';
import {
  MOCKED_ERROR,
  MOCKED_INITIAL_STATE,
  MOCKED_INITIAL_STATE_WITH_ERROR,
  MOCKED_TOKEN,
  MOCKED_USER,
  MOCKED_USER_CREDENTIALS,
} from '@mock_data/auth';
import {
  login,
  loginSuccess,
  loginError,
  getUser,
  getUserSuccess,
  getUserError,
} from '@store/slices/auth';

describe('Tags auth saga', () => {
  describe('should make a login successfully', () => {
    const mockedLogin = jest.spyOn(AuthAPI, 'login').mockImplementation(() => MOCKED_TOKEN);
    const mockedGetUserLogin = jest.spyOn(AuthAPI, 'getUser').mockImplementation(() => MOCKED_USER);

    beforeEach(() => {
      mockedLogin.mockClear();
      mockedGetUserLogin.mockClear();
    });
    const state = { ...rootReducer(undefined, {}) };
    it('should make login at the api', async () => {
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(login(MOCKED_USER_CREDENTIALS))
        .call.like({
          context: AuthAPI,
          fn: AuthAPI.login,
          args: [MOCKED_USER_CREDENTIALS],
        })
        .dispatch(getUser(MOCKED_TOKEN))
        .dispatch(getUserSuccess(MOCKED_TOKEN))
        .take([getUserSuccess, getUserError])
        .dispatch(loginSuccess(MOCKED_TOKEN))
        .hasFinalState({
          ...state,
          auth: { ...MOCKED_INITIAL_STATE },
        })
        .silentRun();

      expect(mockedLogin).toHaveBeenCalledTimes(1);
    });

    it('login saga should fail for wrong email or password', async () => {
      // MOCK GET USER
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mockedGetUserLogin.mockImplementation(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw MOCKED_ERROR;
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(login(MOCKED_USER_CREDENTIALS))
        .call.like({
          context: AuthAPI,
          fn: AuthAPI.login,
          args: [MOCKED_USER_CREDENTIALS],
        })
        .dispatch(getUser(MOCKED_TOKEN))
        .take([getUserSuccess, getUserError])
        .dispatch(getUserError(MOCKED_TOKEN))
        .hasFinalState({
          ...state,
          auth: { ...MOCKED_INITIAL_STATE_WITH_ERROR },
        })
        .silentRun();

      expect(mockedLogin).toHaveBeenCalledTimes(1);
    });

    it('login saga should fail for error at user saga', async () => {
      mockedLogin.mockImplementation(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw MOCKED_ERROR;
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(login(MOCKED_USER_CREDENTIALS))
        .call.like({
          context: AuthAPI,
          fn: AuthAPI.login,
          args: [MOCKED_USER_CREDENTIALS],
        })
        .dispatch(loginError(MOCKED_ERROR))
        .hasFinalState({
          ...state,
          auth: { ...MOCKED_INITIAL_STATE_WITH_ERROR },
        })
        .silentRun();

      expect(mockedLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUser saga testing', () => {
    const mockedGetUser = jest.spyOn(AuthAPI, 'getUser');

    beforeEach(() => {
      mockedGetUser.mockClear();
    });
    const state = { ...rootReducer(undefined, {}) };
    it('should get user from the api', async () => {
      mockedGetUser.mockImplementation(() => MOCKED_USER);
      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(getUser(MOCKED_TOKEN))
        .call.like({
          context: AuthAPI,
          fn: AuthAPI.getUser,
          args: [MOCKED_TOKEN],
        })
        .put(getUserSuccess(MOCKED_USER))
        .hasFinalState({
          ...state,
          auth: { ...state.auth, user: MOCKED_USER },
        })
        .silentRun();

      expect(mockedGetUser).toHaveBeenCalledTimes(1);
    });

    it('get user saga should fail', async () => {
      mockedGetUser.mockImplementation(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw MOCKED_ERROR;
      });

      await expectSaga(rootSaga)
        .withReducer(rootReducer)
        .withState(state)
        .dispatch(getUser(MOCKED_TOKEN))
        .call.like({
          context: AuthAPI,
          fn: AuthAPI.getUser,
          args: [MOCKED_TOKEN],
        })
        .put(getUserError(MOCKED_ERROR))
        .hasFinalState({
          ...state,
          auth: { ...MOCKED_INITIAL_STATE_WITH_ERROR },
        })
        .silentRun();

      expect(mockedGetUser).toHaveBeenCalledTimes(1);
    });
  });
});
// function UserException(message) {
//   this.message = message;
//   this.name = 'UserException';
// }
// throw new UserException('InvalidMonthNo');
