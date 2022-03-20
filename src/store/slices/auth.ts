import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ErrorObject, User } from '../types/models';

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: ErrorObject | null;
}

export const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    login: (state, _action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.loading = false;
      state.token = token;
      state.isAuthenticated = true;
    },
    loginError: (state, action: PayloadAction<ErrorObject>) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUser: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    getUserError: (state, action: PayloadAction<ErrorObject>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { login, loginSuccess, loginError, getUser, getUserSuccess, getUserError } =
  authSlice.actions;

export default authSlice.reducer;
