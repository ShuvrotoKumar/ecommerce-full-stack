import { api } from '@/services/api';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order', 'Cart'],
    }),
    getMyOrders: builder.query({
      query: () => '/orders/myorders',
      providesTags: ['Order'],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createCheckoutSession: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/checkout-session`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useCreateCheckoutSessionMutation,
} = orderApi;
