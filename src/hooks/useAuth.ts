import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '@/services/authApi';
import { RootState } from '@/store';
import { setCredentials, logout, setLoading, setError, initializeAuth } from '@/features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const result = await loginMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      return result;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Login failed';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const result = await registerMutation(userData).unwrap();
      dispatch(setCredentials(result));
      return result;
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    try {
      if (refreshToken) {
        await logoutMutation({ refreshToken }).unwrap();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
    }
  };

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    isLoading: isLoading || isLoginLoading || isRegisterLoading || isLogoutLoading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};
