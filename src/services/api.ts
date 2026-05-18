import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';
import { getCookie } from '@/lib/cookies';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    // Check Redux state first, fallback to cookies
    let token = (getState() as RootState).auth.token;
    if (!token) {
      token = getCookie('token');
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // If token expired, try to refresh
  if (result.error && result.error.status === 401) {
    // Check Redux state first, fallback to cookies
    let refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (!refreshToken) {
      refreshToken = getCookie('refreshToken');
    }
    
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-tokens',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );
      
      if (refreshResult.data) {
        // Store new token - backend returns user and tokens structure
        api.dispatch({
          type: 'auth/setCredentials',
          payload: refreshResult.data,
        });
        
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch({ type: 'auth/logout' });
      }
    }
  }
  
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'User', 'Order', 'Category', 'Cart', 'Wishlist', 'Coupon'],
  endpoints: () => ({}),
});
