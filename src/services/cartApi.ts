import { api } from '@/services/api';

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: '/cart',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
