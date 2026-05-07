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
    getAllOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createPaymentIntent: builder.mutation({
      query: () => ({
        url: '/orders/create-payment-intent',
        method: 'POST',
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/checkout-session`,
        method: 'POST',
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, orderId) => ['Order', { type: 'Order', id: orderId }],
    }),
    updateOrderToDelivered: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/deliver`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, orderId) => ['Order', { type: 'Order', id: orderId }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useCreatePaymentIntentMutation,
  useCreateCheckoutSessionMutation,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = orderApi;
