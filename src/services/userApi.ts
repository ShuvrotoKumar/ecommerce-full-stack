import { api } from '@/services/api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/users/me',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/users/change-password',
        method: 'PATCH',
        body: passwords,
      }),
    }),
    getAddresses: builder.query({
      query: () => '/users/addresses',
      providesTags: ['User'],
    }),
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/users/addresses',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation({
      query: ({ addressId, ...updateData }) => ({
        url: `/users/addresses/${addressId}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/users/addresses/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = userApi;
