import type { User, ErrorObject } from '../types/models';
import type { Selector } from '../types/redux';

export const getUser: Selector<User | null> = (state): User | null => state.auth.user;

export const getToken: Selector<string | null> = (state): string | null => state.auth.token;

export const getAuthError: Selector<ErrorObject | null> = (state): ErrorObject | null =>
  state.auth.error;

export const getIsAuthenticated: Selector<boolean> = (state): boolean => state.auth.isAuthenticated;

export const getAuthIsLoading: Selector<boolean> = (state): boolean => state.auth.loading;
