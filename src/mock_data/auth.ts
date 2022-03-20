import type { initialState } from '@store/slices/auth';
import type { ErrorObject, User } from '@store/types/models';

export const MOCKED_USER: User = {
  email: 'mock@gmail.com',
  name: 'MOCK NAME',
};

export const MOCKED_USER_CREDENTIALS = {
  email: 'mock@gmail.com',
  password: 'MOCK_PASSWORD',
};

export const MOCKED_ERROR: ErrorObject = {
  message: 'MOCKED ERROR MESSAGE',
  status: 400,
};

export const MOCKED_TOKEN = 'MOCK_TOKEN';

export const MOCKED_INITIAL_STATE: typeof initialState = {
  user: MOCKED_USER,
  token: MOCKED_TOKEN,
  error: null,
  loading: false,
  isAuthenticated: true,
};

export const MOCKED_INITIAL_STATE_WITH_ERROR: typeof initialState = {
  user: null,
  token: null,
  error: MOCKED_ERROR,
  loading: false,
  isAuthenticated: false,
};

export const MOCKED_INITIAL_STATE_LOADING: typeof initialState = {
  user: null,
  token: null,
  error: null,
  loading: true,
  isAuthenticated: false,
};
