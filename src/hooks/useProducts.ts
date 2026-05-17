import { useGetProductsQuery, useGetProductQuery } from '@/services/productApi';

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const useProducts = (filters?: ProductFilters) => {
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery(filters || {}, {
    skip: false,
  });

  return {
    products: productsData?.data || [],
    pagination: {
      page: productsData?.page || 1,
      limit: productsData?.limit || 12,
      total: productsData?.total || 0,
      totalPages: productsData?.totalPages || 0,
    },
    isLoading,
    error,
    refetchProducts: refetch,
  };
};

export const useProduct = (id?: string) => {
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductQuery(id!, {
    skip: !id,
  });

  return {
    product: productData,
    isLoading,
    error,
  };
};
