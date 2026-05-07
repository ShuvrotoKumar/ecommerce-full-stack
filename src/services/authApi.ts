import { api } from '@/services/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    refreshTokens: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh-tokens',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokensMutation,
} = authApi;
