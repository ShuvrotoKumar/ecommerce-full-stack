import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery, useGetProductQuery } from '@/services/productApi';
import { RootState } from '@/store';
import {
  setProducts,
  setCurrentProduct,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  setPagination,
} from '@/features/products/productSlice';

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
  const dispatch = useDispatch();
  const { products, currentProduct, isLoading, error, filters: currentFilters, pagination } = useSelector(
    (state: RootState) => state.products
  );

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery(filters || {}, {
    skip: false,
  });

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData.data || []));
      dispatch(setPagination({
        page: productsData.page || 1,
        limit: productsData.limit || 12,
        total: productsData.total || 0,
        totalPages: productsData.totalPages || 0,
      }));
    }
  }, [productsData, dispatch]);

  useEffect(() => {
    if (productsError) {
      const errorMessage = (productsError as any)?.data?.message || 'Failed to load products';
      dispatch(setError(errorMessage));
    }
  }, [productsError, dispatch]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    dispatch(setFilters(newFilters));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  return {
    products,
    currentProduct,
    isLoading: isLoading || isProductsLoading,
    error,
    filters: currentFilters,
    pagination,
    refetchProducts,
    updateFilters,
    resetFilters,
  };
};

export const useProduct = (id?: string) => {
  const dispatch = useDispatch();
  const { currentProduct, isLoading, error } = useSelector(
    (state: RootState) => state.products
  );

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (productData) {
      dispatch(setCurrentProduct(productData));
    }
  }, [productData, dispatch]);

  useEffect(() => {
    if (productError) {
      const errorMessage = (productError as any)?.data?.message || 'Failed to load product';
      dispatch(setError(errorMessage));
    }
  }, [productError, dispatch]);

  return {
    product: currentProduct,
    isLoading: isLoading || isProductLoading,
    error,
  };
};
