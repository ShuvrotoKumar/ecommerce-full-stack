import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshTokensMutation } from '@/services/authApi';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload }: PayloadAction<{ user: User; tokens: { access: string; refresh: string } }>
    ) => {
      state.user = payload.user;
      state.token = payload.tokens.access;
      state.refreshToken = payload.tokens.refresh;
      state.isAuthenticated = true;
      state.error = null;
      
      // Store tokens in localStorage for persistence
      localStorage.setItem('token', payload.tokens.access);
      localStorage.setItem('refreshToken', payload.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const userStr = localStorage.getItem('user');
      
      if (token && refreshToken && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.user = user;
          state.token = token;
          state.refreshToken = refreshToken;
          state.isAuthenticated = true;
        } catch (error) {
          // Clear invalid stored data
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
    },
  },
});

export const { setCredentials, logout, setLoading, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
