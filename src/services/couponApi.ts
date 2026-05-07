import { api } from '@/services/api';

export const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => '/coupons',
      providesTags: ['Coupon'],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: '/coupons',
        method: 'POST',
        body: couponData,
      }),
      invalidatesTags: ['Coupon'],
    }),
    validateCoupon: builder.mutation({
      query: (code) => ({
        url: '/coupons/validate',
        method: 'POST',
        body: { code },
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useValidateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
