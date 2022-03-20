import type { RootState } from '../../index';

import {
  MOCKED_ERROR,
  MOCKED_INITIAL_STATE,
  MOCKED_INITIAL_STATE_LOADING,
  MOCKED_INITIAL_STATE_WITH_ERROR,
  MOCKED_TOKEN,
  MOCKED_USER,
} from '@mock_data/auth';
import {
  getAuthError,
  getAuthIsLoading,
  getIsAuthenticated,
  getToken,
  getUser,
} from '@store/selectors/auth';
import type { initialState } from '@store/slices/auth';

const buildState = ({
  user,
  token,
  error,
  loading,
  isAuthenticated,
}: typeof initialState): RootState => ({
  auth: {
    user,
    token,
    error,
    loading,
    isAuthenticated,
  },
});

describe('Testing get User selector', () => {
  it('Should get user', () => {
    const state = buildState(MOCKED_INITIAL_STATE);
    const result = getUser(state);
    expect(result).toBe(MOCKED_USER);
  });

  it('Should user as null', () => {
    const state = buildState(MOCKED_INITIAL_STATE_WITH_ERROR);
    const result = getUser(state);
    expect(result).toEqual(null);
  });
});

describe('Testing getToken selector', () => {
  it('Should get token', () => {
    const state = buildState(MOCKED_INITIAL_STATE);
    const result = getToken(state);
    expect(result).toBe(MOCKED_TOKEN);
  });

  it('Should return NULL', () => {
    const state = buildState(MOCKED_INITIAL_STATE_WITH_ERROR);
    const result = getToken(state);
    expect(result).toBe(null);
  });
});

describe('Testing getAuthError selector', () => {
  it('Should get error', () => {
    const state = buildState(MOCKED_INITIAL_STATE_WITH_ERROR);
    const result = getAuthError(state);
    expect(result).toBe(MOCKED_ERROR);
  });

  it('Should return NULL', () => {
    const state = buildState(MOCKED_INITIAL_STATE);
    const result = getAuthError(state);
    expect(result).toBe(null);
  });
});

describe('Testing getIsAuthenticated selector', () => {
  it('Should get true', () => {
    const state = buildState(MOCKED_INITIAL_STATE);
    const result = getIsAuthenticated(state);
    expect(result).toBe(true);
  });

  it('Should get false', () => {
    const state = buildState(MOCKED_INITIAL_STATE_WITH_ERROR);
    const result = getIsAuthenticated(state);
    expect(result).toBe(false);
  });
});

describe('Testing getAuthIsLoading selector', () => {
  it('Should get true', () => {
    const state = buildState(MOCKED_INITIAL_STATE_LOADING);
    const result = getAuthIsLoading(state);
    expect(result).toBe(true);
  });

  it('Should get false', () => {
    const state = buildState(MOCKED_INITIAL_STATE_WITH_ERROR);
    const result = getAuthIsLoading(state);
    expect(result).toBe(false);
  });
});
