import { MOCKED_ERROR, MOCKED_USER, MOCKED_TOKEN, MOCKED_USER_CREDENTIALS } from '@mock_data/auth';
import reducer, {
  initialState,
  login,
  loginSuccess,
  loginError,
  getUser,
  getUserSuccess,
  getUserError,
} from '@store/slices/auth';

describe('Testing auth reducer', () => {
  type SliceState = typeof initialState;
  let previousState: SliceState;
  beforeEach(() => {
    previousState = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle a user trying to login', () => {
    expect(reducer(previousState, login(MOCKED_USER_CREDENTIALS))).toEqual({
      ...previousState,
      loading: true,
    });
  });

  it('should handle a successful login request ', () => {
    const result = reducer(previousState, loginSuccess({ token: MOCKED_TOKEN }));
    expect(result).toEqual({
      ...previousState,
      token: MOCKED_TOKEN,
      isAuthenticated: true,
      loading: false,
    });
  });

  it('should handle a login request failure', () => {
    const result = reducer(previousState, loginError(MOCKED_ERROR));
    expect(result).toEqual({
      ...previousState,
      error: MOCKED_ERROR,
      loading: false,
    });
  });

  describe('fetching user from backend steps', () => {
    it('should handle get user request start', () => {
      const result = reducer(previousState, getUser(MOCKED_TOKEN));
      expect(result).toEqual({
        ...previousState,
        loading: true,
      });
    });

    it('should handle get user request success', () => {
      const result = reducer(previousState, getUserSuccess(MOCKED_USER));
      expect(result).toEqual({
        ...previousState,
        user: MOCKED_USER,
        loading: false,
      });
    });

    it('should handle get user request failure', () => {
      const result = reducer(previousState, getUserError(MOCKED_ERROR));
      expect(result).toEqual({
        ...previousState,
        error: MOCKED_ERROR,
        loading: false,
      });
    });
  });
});
