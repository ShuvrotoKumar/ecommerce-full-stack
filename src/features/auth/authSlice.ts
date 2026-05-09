import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshTokensMutation } from '@/services/authApi';
import { setAuthCookies, removeAuthCookies, getCookie } from '@/lib/cookies';

interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
  role: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  isEmailVerified?: boolean;
  phone?: string;
  language?: string;
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
      { payload }: PayloadAction<{ user: User; tokens: { access: { token: string }; refresh: { token: string } } }>
    ) => {
      state.user = payload.user;
      state.token = payload.tokens.access.token;
      state.refreshToken = payload.tokens.refresh.token;
      state.isAuthenticated = true;
      state.error = null;
      
      // Store tokens in localStorage for persistence
      localStorage.setItem('token', payload.tokens.access.token);
      localStorage.setItem('refreshToken', payload.tokens.refresh.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
      
      // Store tokens in cookies for server-side access
      setAuthCookies(payload.tokens.access.token, payload.tokens.refresh.token);
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
      
      // Clear cookies
      removeAuthCookies();
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    initializeAuth: (state) => {
      // Check localStorage first, fallback to cookies
      let token = localStorage.getItem('token');
      let refreshToken = localStorage.getItem('refreshToken');
      let userStr = localStorage.getItem('user');
      
      // If not in localStorage, check cookies
      if (!token) {
        token = getCookie('token');
      }
      if (!refreshToken) {
        refreshToken = getCookie('refreshToken');
      }
      
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
          removeAuthCookies();
        }
      }
    },
  },
});

export const { setCredentials, logout, setLoading, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
