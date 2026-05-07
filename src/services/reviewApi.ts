import { api } from '@/services/api';

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/reviews/${productId}`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/reviews/${productId}/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
