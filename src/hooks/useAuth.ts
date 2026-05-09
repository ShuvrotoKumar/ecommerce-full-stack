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
      
      // Validate the response structure
      if (!result || !result.tokens || !result.user) {
        throw new Error('Invalid response from server');
      }
      
      dispatch(setCredentials(result));
      return result;
    } catch (error: any) {
      // Extract proper error message from RTK Query error
      let errorMessage = 'Login failed';
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 401) {
        errorMessage = 'Invalid email or password';
      }
      
      dispatch(setError(errorMessage));
      throw { ...error, message: errorMessage };
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
      
      // Validate the response structure
      if (!result || !result.tokens || !result.user) {
        throw new Error('Invalid response from server');
      }
      
      dispatch(setCredentials(result));
      return result;
    } catch (error: any) {
      // Extract proper error message from RTK Query error
      let errorMessage = 'Registration failed';
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      dispatch(setError(errorMessage));
      throw { ...error, message: errorMessage };
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
