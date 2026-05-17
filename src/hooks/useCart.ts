import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } from '@/services/cartApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useCart = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: cartData,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [addToCartMutation, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCartMutation, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();
  const [clearCartMutation, { isLoading: isClearLoading }] = useClearCartMutation();

  const items = cartData?.items || [];
  const totalQuantity = cartData?.totalQuantity || 0;
  const totalAmount = cartData?.totalAmount || 0;

  const addToCart = async (productId: string, quantity: number = 1, variant?: string) => {
    return await addToCartMutation({ productId, quantity, variant }).unwrap();
  };

  const removeFromCart = async (itemId: string) => {
    return await removeFromCartMutation(itemId).unwrap();
  };

  const clearCart = async () => {
    return await clearCartMutation({}).unwrap();
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    isLoading: isCartLoading || isAddLoading || isRemoveLoading || isClearLoading,
    error: cartError,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
