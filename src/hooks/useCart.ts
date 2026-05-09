import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } from '@/services/cartApi';
import { RootState } from '@/store';
import { setCart, setLoading, setError, clearLocalCart } from '@/features/cart/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, isLoading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [addToCartMutation, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCartMutation, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();
  const [clearCartMutation, { isLoading: isClearLoading }] = useClearCartMutation();

  useEffect(() => {
    if (cartData && isAuthenticated) {
      dispatch(setCart(cartData.items || []));
    }
  }, [cartData, isAuthenticated, dispatch]);

  useEffect(() => {
    if (cartError) {
      const errorMessage = (cartError as any)?.data?.message || 'Failed to load cart';
      dispatch(setError(errorMessage));
    }
  }, [cartError, dispatch]);

  const addToCart = async (productId: string, quantity: number = 1, variant?: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const result = await addToCartMutation({
        productId,
        quantity,
        variant,
      }).unwrap();
      
      // Refetch cart to get updated data
      refetchCart();
      return result;
    } catch (error: any) {
      const errorMessage = (error as any)?.data?.message || 'Failed to add item to cart';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      await removeFromCartMutation(itemId).unwrap();
      
      // Refetch cart to get updated data
      refetchCart();
    } catch (error: any) {
      const errorMessage = (error as any)?.data?.message || 'Failed to remove item from cart';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearCart = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      await clearCartMutation(undefined).unwrap();
      
      // Clear local cart state
      dispatch(clearLocalCart());
    } catch (error: any) {
      const errorMessage = (error as any)?.data?.message || 'Failed to clear cart';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    isLoading: isLoading || isCartLoading || isAddLoading || isRemoveLoading || isClearLoading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    refetchCart,
  };
};
