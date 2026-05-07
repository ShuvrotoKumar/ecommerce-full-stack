import { api } from '@/services/api';

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const {
  useUploadImagesMutation,
} = uploadApi;
